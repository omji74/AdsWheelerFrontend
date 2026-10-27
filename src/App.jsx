import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, AlertCircle, ArrowRight, Car, Building2 } from 'lucide-react';
import Navbar from './components/Navbar';
import AuthPage from './components/AuthPage';
import HeroSection from './components/HeroSection';
import CampaignExplorer from './components/CampaignExplorer';
import EarningsCalculator from './components/EarningsCalculator';
import DriverPortal from './components/DriverPortal';
import AdvertiserPortal from './components/AdvertiserPortal';
import CreateAdSlideOver from './components/CreateAdSlideOver';
import AuthModal from './components/AuthModal';
import StatsSection from './components/StatsSection';
import VehicleSimulator from './components/VehicleSimulator';
import Footer from './components/Footer';
import {
  checkHealth,
  apiGetAds,
  apiCreateAd,
  apiDeleteAd,
  apiGetApplications,
  apiCreateApplication,
  apiUpdateApplicationStatus,
  apiGetNotifications,
  apiMarkNotificationRead,
  getStoredAuthUser,
  apiLogout
} from './api/client';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [guestMode, setGuestMode] = useState(false);
  const [currentRole, setCurrentRole] = useState('PUBLIC'); // 'PUBLIC' | 'DRIVER' | 'PUBLISHER'

  const [ads, setAds] = useState([]);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [backendOnline, setBackendOnline] = useState(false);
  const [loadingAds, setLoadingAds] = useState(true);

  // Modals & Slide-overs
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [authRole, setAuthRole] = useState('DRIVER');
  const [isCreateSlideOverOpen, setIsCreateSlideOverOpen] = useState(false);

  // Friendly Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Initial Load & Auth Session Check
  useEffect(() => {
    const init = async () => {
      // 1. Session check - authentic user only, null if none
      const stored = getStoredAuthUser();
      if (stored) {
        setCurrentUser(stored);
        if (stored.role === 'DRIVER') {
          setCurrentRole('DRIVER');
        } else if (stored.role === 'PUBLISHER') {
          setCurrentRole('PUBLISHER');
        }
      }

      // 2. Health check
      const health = await checkHealth();
      setBackendOnline(health.online);

      // 3. Fetch Ads from live DB
      setLoadingAds(true);
      const adsRes = await apiGetAds();
      if (adsRes.success) setAds(adsRes.data);
      setLoadingAds(false);

      // 4. Fetch Applications
      const appRes = await apiGetApplications();
      if (appRes.success) setApplications(appRes.data);

      // 5. Fetch Notifications
      if (stored?.id) {
        const notifRes = await apiGetNotifications(stored.id);
        if (notifRes.success) setNotifications(notifRes.data);
      }
    };

    init();
  }, []);

  // Handle Authentication Success (Login or Sign Up)
  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setGuestMode(false);
    setIsAuthOpen(false);
    showToast(`Welcome ${user.name || 'Partner'}! Logged in as ${user.role === 'DRIVER' ? 'Auto Driver' : 'Ad Publisher'}`);

    if (user.role === 'DRIVER') {
      setCurrentRole('DRIVER');
    } else if (user.role === 'PUBLISHER') {
      setCurrentRole('PUBLISHER');
    }
  };

  // Handle Logout -> Redirect immediately to Login/Signup Page
  const handleLogout = () => {
    apiLogout();
    setCurrentUser(null);
    setGuestMode(false);
    setCurrentRole('PUBLIC');
    showToast('Logged out successfully', 'info');
  };

  // Open Auth Modal
  const handleOpenAuth = (mode = 'login', role = 'DRIVER') => {
    setAuthMode(mode);
    setAuthRole(role);
    setIsAuthOpen(true);
  };

  // Driver Accepts / Applies to a Campaign
  const handleApplyAd = async (ad) => {
    if (!currentUser) {
      handleOpenAuth('login', 'DRIVER');
      showToast('Please sign in as a Driver to accept this campaign', 'info');
      return;
    }

    if (currentUser.role !== 'DRIVER') {
      showToast('Only registered Auto Drivers can accept campaigns.', 'info');
      return;
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
      setApplications([res.data, ...applications]);

      const newNotif = {
        id: String(Date.now()),
        user_id: currentUser.id,
        title: 'Campaign Contract Accepted 🎉',
        message: `You have successfully enrolled in "${ad.title}". Monthly payout: ₹${Number(ad.price).toLocaleString('en-IN')}. Visit nearest hub for wrap installation.`,
        read_status: false,
        created_at: Date.now()
      };
      setNotifications([newNotif, ...notifications]);

      showToast(`Campaign accepted! Monthly payout: ₹${Number(ad.price).toLocaleString('en-IN')}`);
    }
  };

  // Publisher Launches / Creates a Campaign
  const handleCreateAd = async (adData) => {
    if (!currentUser || currentUser.role !== 'PUBLISHER') {
      showToast('Only Ad Publishers can launch campaigns.', 'info');
      return;
    }

    const res = await apiCreateAd({
      ...adData,
      publisher_id: currentUser.id,
      business_name: adData.business_name || currentUser.profile?.business_name || currentUser.name || 'Verified Brand'
    });

    if (res.success) {
      setAds([res.data, ...ads]);
      showToast(`Campaign "${res.data.title}" is now published and active in the marketplace!`);
    }
  };

  // Publisher Deletes an Ad
  const handleDeleteAd = async (id) => {
    const res = await apiDeleteAd(id);
    if (res.success) {
      setAds(ads.filter((a) => a.id !== id));
      showToast('Campaign removed from active inventory', 'info');
    }
  };

  // Publisher Updates Driver Application Status (Approve / Activate / Pay UPI)
  const handleUpdateAppStatus = async (id, statusData) => {
    const res = await apiUpdateApplicationStatus(id, statusData);
    if (res.success) {
      setApplications(
        applications.map((app) => (app.id === id || String(app.id) === String(id) ? { ...app, ...statusData } : app))
      );
      showToast(`Application #${id} updated: ${statusData.status || statusData.payment_status}!`);
    }
  };

  // Handle Notifications Read Status
  const handleMarkNotificationRead = async (id) => {
    await apiMarkNotificationRead(id);
    setNotifications(
      notifications.map((n) => (n.id === id || String(n.id) === String(id) ? { ...n, read_status: true } : n))
    );
  };

  // Calculate applied ad IDs for current driver
  const appliedAdIds = applications
    .filter((a) => !currentUser?.id || String(a.driver_id) === String(currentUser.id))
    .map((a) => a.advertisement_id);

  // IF USER IS NOT LOGGED IN AND NOT IN GUEST PREVIEW -> SHOW DEDICATED LOGIN / SIGNUP PAGE
  if (!currentUser && !guestMode) {
    return (
      <AuthPage
        onAuthSuccess={handleAuthSuccess}
        onContinueGuest={() => setGuestMode(true)}
        initialRole="DRIVER"
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1C1917] font-['Plus_Jakarta_Sans',sans-serif] relative">
      {/* Friendly Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="px-4 py-3 rounded-xl bg-stone-900 text-white shadow-lg text-xs font-medium flex items-center gap-2.5">
              {toast.type === 'info' ? (
                <Info className="w-4 h-4 text-stone-300" />
              ) : (
                <Check className="w-4 h-4 text-emerald-400" />
              )}
              <span>{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guest Mode Alert Banner */}
      {!currentUser && guestMode && (
        <div className="bg-amber-50 border-b border-amber-200/80 px-3 sm:px-4 py-2.5 text-xs text-amber-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 max-w-7xl mx-auto w-full">
            <span className="flex items-center gap-1.5 font-medium leading-tight">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
              Viewing as Guest. Sign in as Driver to accept campaigns, or as Publisher to post campaigns.
            </span>
            <button
              onClick={() => {
                setGuestMode(false);
                setIsAuthOpen(false);
              }}
              className="self-start sm:self-auto px-3 py-1 bg-amber-700 text-white rounded-lg font-bold text-[11px] hover:bg-amber-800 transition-colors cursor-pointer shrink-0"
            >
              Sign In / Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        backendOnline={backendOnline}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onOpenCreateAd={() => {
          if (!currentUser) {
            handleOpenAuth('login', 'PUBLISHER');
          } else if (currentUser.role === 'PUBLISHER') {
            setIsCreateSlideOverOpen(true);
          } else {
            showToast('Posting campaigns is reserved for Ad Publishers.', 'info');
          }
        }}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main Workspace Content based on Role & Auth */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pb-24 md:pb-10">
        <AnimatePresence mode="wait">
          {/* ======================================================== */}
          {/* 1. PUBLIC / GUEST EXPLORER VIEW                          */}
          {/* ======================================================== */}
          {currentRole === 'PUBLIC' && (
            <motion.div
              key="public"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <HeroSection
                onExploreClick={() => {
                  const el = document.getElementById('marketplace');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                onAdvertiserClick={() => {
                  if (!currentUser) {
                    handleOpenAuth('signup', 'PUBLISHER');
                  } else if (currentUser.role === 'PUBLISHER') {
                    setCurrentRole('PUBLISHER');
                  } else {
                    showToast('Switch to an Ad Publisher account to launch campaigns.', 'info');
                  }
                }}
              />

              <StatsSection />

              <div id="marketplace">
                <CampaignExplorer
                  ads={ads}
                  onApply={handleApplyAd}
                  appliedAdIds={appliedAdIds}
                  userRole={currentUser?.role || 'PUBLIC'}
                  onOpenCreateAd={() => {
                    if (currentUser?.role === 'PUBLISHER') {
                      setIsCreateSlideOverOpen(true);
                    } else {
                      handleOpenAuth('signup', 'PUBLISHER');
                    }
                  }}
                  loading={loadingAds}
                />
              </div>

              <EarningsCalculator
                onApplyClick={() => {
                  const el = document.getElementById('marketplace');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* 2. DRIVER HOME PAGE: Accept campaigns, see all, contracts */}
          {/* ======================================================== */}
          {currentRole === 'DRIVER' && (
            <motion.div
              key="driver"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {/* Driver Contracts & Payouts Ledger */}
              <DriverPortal
                applications={applications}
                onBrowseMore={() => {
                  const el = document.getElementById('campaigns-to-accept');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                currentUser={currentUser}
              />

              {/* All Available Campaigns to Accept */}
              <div id="campaigns-to-accept">
                <div className="mb-2 p-3 bg-teal-50/70 border border-teal-200/80 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-teal-800" />
                    <span className="text-xs font-bold text-teal-900">
                      Driver Marketplace: You can browse and accept any campaign below for your Auto or E-Rickshaw.
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-teal-700 bg-white px-2 py-0.5 rounded-full border border-teal-200">
                    Direct UPI Payouts
                  </span>
                </div>

                <CampaignExplorer
                  ads={ads}
                  onApply={handleApplyAd}
                  appliedAdIds={appliedAdIds}
                  userRole="DRIVER"
                  onOpenCreateAd={() => {}} // Driver cannot launch ads
                  loading={loadingAds}
                />
              </div>

              {/* Live Vehicle Simulator for Drivers */}
              <div className="my-8">
                <VehicleSimulator />
              </div>

              {/* Earnings Calculator */}
              <EarningsCalculator
                onApplyClick={() => {
                  const el = document.getElementById('campaigns-to-accept');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* 3. AD PUBLISHER HOME PAGE: Post campaigns & manage fleet */}
          {/* ======================================================== */}
          {currentRole === 'PUBLISHER' && (
            <motion.div
              key="publisher"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {/* Advertiser Hub & Driver Applications Review */}
              <AdvertiserPortal
                ads={ads}
                applications={applications}
                onOpenCreateAd={() => setIsCreateSlideOverOpen(true)}
                onUpdateAppStatus={handleUpdateAppStatus}
                onDeleteAd={handleDeleteAd}
                currentUser={currentUser}
              />

              {/* Simulator for Brand Campaigns */}
              <div className="my-8">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-stone-900 font-display">
                    Interactive Transit Fleet Visualizer
                  </h3>
                  <p className="text-xs text-stone-500">
                    See how your branded vinyl wraps look on CNG Auto Rickshaws and Electric E-Rickshaws.
                  </p>
                </div>
                <VehicleSimulator />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Slide-Over Panel for Campaign Creation (Only for Publishers) */}
      <CreateAdSlideOver
        isOpen={isCreateSlideOverOpen}
        onClose={() => setIsCreateSlideOverOpen(false)}
        onCreateAd={handleCreateAd}
        currentUser={currentUser}
      />

      {/* Authentication Modal (for guest mode quick logins) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authMode}
        initialRole={authRole}
      />

      {/* Daylight Studio Footer */}
      <Footer onRoleChange={setCurrentRole} />
    </div>
  );
}
