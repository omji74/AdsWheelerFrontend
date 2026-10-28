import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  checkHealth,
  apiGetAds,
  apiCreateAd,
  apiDeleteAd,
  apiGetApplications,
  apiCreateApplication,
  apiUpdateApplicationStatus,
  apiGetNotifications,
  apiMarkNotificationRead
} from '../api/client';
import { useAuth } from './AuthContext';

const CampaignContext = createContext(null);

export function CampaignProvider({ children }) {
  const { currentUser } = useAuth();

  const [ads, setAds] = useState([]);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [backendOnline, setBackendOnline] = useState(false);
  const [loadingAds, setLoadingAds] = useState(true);

  // Friendly Toast state
  const [toast, setToast] = useState(null);

  // Global Slide-Over & Modal controls
  const [isCreateSlideOverOpen, setIsCreateSlideOverOpen] = useState(false);
  const [authModalState, setAuthModalState] = useState({
    isOpen: false,
    mode: 'login',
    role: 'DRIVER'
  });

  // Pre-fill state for Instant Quotation
  const [quotePreFill, setQuotePreFill] = useState({
    brandName: '',
    format: 'DIGITAL_LED',
    fleetCount: 50,
    headline: ''
  });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const openAuthModal = useCallback((mode = 'login', role = 'DRIVER') => {
    setAuthModalState({ isOpen: true, mode, role });
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  // Fetch ads
  const fetchAds = useCallback(async () => {
    setLoadingAds(true);
    try {
      const res = await apiGetAds();
      if (res.success && Array.isArray(res.data)) {
        setAds(res.data);
      }
    } catch (e) {
      console.warn('Failed to load ads', e);
    } finally {
      setLoadingAds(false);
    }
  }, []);

  // Fetch applications
  const fetchApplications = useCallback(async () => {
    try {
      const res = await apiGetApplications();
      if (res.success && Array.isArray(res.data)) {
        setApplications(res.data);
      }
    } catch (e) {
      console.warn('Failed to load applications', e);
    }
  }, []);

  // Fetch notifications
  const fetchNotifications = useCallback(async (userId) => {
    if (!userId) return;
    try {
      const res = await apiGetNotifications(userId);
      if (res.success && Array.isArray(res.data)) {
        setNotifications(res.data);
      }
    } catch (e) {
      console.warn('Failed to load notifications', e);
    }
  }, []);

  // Initial load
  useEffect(() => {
    checkHealth().then((h) => setBackendOnline(h.online));
    fetchAds();
    fetchApplications();
  }, [fetchAds, fetchApplications]);

  // Notifications when user logs in or changes
  useEffect(() => {
    if (currentUser?.id) {
      fetchNotifications(currentUser.id);
    } else {
      setNotifications([]);
    }
  }, [currentUser?.id, fetchNotifications]);

  // Apply creative to quotation engine
  const applyCreativeToQuotation = useCallback((cfg) => {
    setQuotePreFill((prev) => ({
      ...prev,
      brandName: cfg.brandName || prev.brandName,
      headline: cfg.headline || prev.headline
    }));
    showToast('Creative applied to Instant Quotation!');
  }, [showToast]);

  // Select package in quotation engine
  const selectPackageForQuotation = useCallback((pkgId) => {
    let formatCode = 'DIGITAL_LED';
    if (pkgId === 'hood-wrap') formatCode = 'HOOD_WRAP';
    else if (pkgId === 'back-panel') formatCode = 'BACK_PANEL';
    else if (pkgId === 'interior-strip') formatCode = 'INTERIOR_STRIP';

    setQuotePreFill((prev) => ({ ...prev, format: formatCode }));
    showToast('Package applied to Instant Quotation!');
  }, [showToast]);

  // Driver applies to campaign
  const applyToCampaign = useCallback(async (ad) => {
    if (!currentUser) {
      openAuthModal('login', 'DRIVER');
      showToast('Please sign in as a Driver to accept this campaign', 'info');
      return { success: false, reason: 'AUTH_REQUIRED' };
    }

    if (currentUser.role !== 'DRIVER') {
      showToast('Only registered Auto Drivers can accept campaigns.', 'info');
      return { success: false, reason: 'ROLE_MISMATCH' };
    }

    const res = await apiCreateApplication({
      advertisement_id: ad.id,
      driver_id: currentUser.id,
      driver_name: currentUser.name,
      driver_phone: currentUser.phone,
      ad_title: ad.title,
      amount: ad.price
    });

    if (res.success) {
      setApplications((prev) => [res.data, ...prev]);

      const newNotif = {
        id: String(Date.now()),
        user_id: currentUser.id,
        title: 'Campaign Contract Accepted 🎉',
        message: `You have successfully enrolled in "${ad.title}". Monthly payout: ₹${Number(ad.price).toLocaleString('en-IN')}. Visit nearest hub for wrap installation.`,
        read_status: false,
        created_at: Date.now()
      };
      setNotifications((prev) => [newNotif, ...prev]);

      showToast(`Campaign accepted! Monthly payout: ₹${Number(ad.price).toLocaleString('en-IN')}`);
      return { success: true, data: res.data };
    }
    showToast('Could not accept campaign. Please try again.', 'info');
    return { success: false };
  }, [currentUser, openAuthModal, showToast]);

  // Publisher creates ad
  const createCampaign = useCallback(async (adData) => {
    if (!currentUser || currentUser.role !== 'PUBLISHER') {
      showToast('Only Ad Publishers can launch campaigns.', 'info');
      return { success: false };
    }

    const res = await apiCreateAd({
      ...adData,
      publisher_id: currentUser.id,
      business_name: adData.business_name || currentUser.profile?.business_name || currentUser.name || 'Verified Brand'
    });

    if (res.success) {
      setAds((prev) => [res.data, ...prev]);
      showToast(`Campaign "${res.data.title}" is now published and active in the marketplace!`);
      return { success: true, data: res.data };
    }
    return { success: false };
  }, [currentUser, showToast]);

  // Publisher deletes ad
  const deleteCampaign = useCallback(async (id) => {
    const res = await apiDeleteAd(id);
    if (res.success) {
      setAds((prev) => prev.filter((a) => a.id !== id));
      showToast('Campaign removed from active inventory', 'info');
      return { success: true };
    }
    return { success: false };
  }, [showToast]);

  // Publisher updates application status
  const updateAppStatus = useCallback(async (id, statusData) => {
    const res = await apiUpdateApplicationStatus(id, statusData);
    if (res.success) {
      setApplications((prev) =>
        prev.map((app) => (app.id === id || String(app.id) === String(id) ? { ...app, ...statusData } : app))
      );
      showToast(`Application #${id} updated: ${statusData.status || statusData.payment_status}!`);
      return { success: true };
    }
    return { success: false };
  }, [showToast]);

  // Mark notification read
  const markNotificationRead = useCallback(async (id) => {
    await apiMarkNotificationRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id || String(n.id) === String(id) ? { ...n, read_status: true } : n))
    );
  }, []);

  const appliedAdIds = applications
    .filter((a) => !currentUser?.id || String(a.driver_id) === String(currentUser.id))
    .map((a) => a.advertisement_id);

  return (
    <CampaignContext.Provider
      value={{
        ads,
        loadingAds,
        fetchAds,
        applications,
        appliedAdIds,
        fetchApplications,
        notifications,
        markNotificationRead,
        backendOnline,
        quotePreFill,
        setQuotePreFill,
        applyCreativeToQuotation,
        selectPackageForQuotation,
        applyToCampaign,
        createCampaign,
        deleteCampaign,
        updateAppStatus,
        toast,
        showToast,
        isCreateSlideOverOpen,
        setIsCreateSlideOverOpen,
        authModalState,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaign() {
  const ctx = useContext(CampaignContext);
  if (!ctx) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return ctx;
}
