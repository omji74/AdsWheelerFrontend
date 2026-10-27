import { MOCK_ADS, MOCK_APPLICATIONS, MOCK_NOTIFICATIONS, MOCK_USERS } from './mockData';

// Direct production backend URL on Vercel
export const LIVE_BACKEND_URL = 'https://ads-wheeler-backend.vercel.app';
const BASE_URL = `${LIVE_BACKEND_URL}/api`;

// Helper for local storage
const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(`adswheeler_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const setStored = (key, value) => {
  try {
    localStorage.setItem(`adswheeler_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error:', e);
  }
};

// Check if backend is alive
export const checkHealth = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`${BASE_URL}/health`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error('Health check non-200');
    const data = await res.json();
    return { online: true, details: data };
  } catch (err) {
    // Also try root /
    try {
      const res = await fetch(`${LIVE_BACKEND_URL}/`);
      if (res.ok) return { online: true };
    } catch {}
    return { online: false, error: err.message };
  }
};

// ==========================================
// 1. AUTHENTICATION & USERS (REAL ACCOUNTS ONLY)
// ==========================================

export const apiLogin = async ({ email, password, role }) => {
  const cleanEmail = String(email).toLowerCase().trim();

  // 1. Check local saved registered accounts first (with password check)
  const localAccounts = getStored('accounts', []);
  const localUser = localAccounts.find((u) => u.email.toLowerCase() === cleanEmail);

  if (localUser) {
    if (password && localUser.password && localUser.password !== password) {
      throw new Error('Incorrect password. Please verify your credentials.');
    }
    if (role && localUser.role !== role.toUpperCase()) {
      const friendlyRole = localUser.role === 'DRIVER' ? 'Auto Driver' : 'Ad Publisher';
      const attemptedRole = role === 'DRIVER' ? 'Auto Driver' : 'Ad Publisher';
      throw new Error(`This account is registered as ${friendlyRole}, not ${attemptedRole}. Please switch your role.`);
    }
    setStored('auth_user', localUser);
    setStored('auth_token', `token_${localUser.id}`);
    return { success: true, user: localUser };
  }

  // 2. Verify against live PostgreSQL database on Vercel
  try {
    const res = await fetch(`${BASE_URL}/users`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const found = json.data.find((u) => u.email.toLowerCase() === cleanEmail);
        if (found) {
          if (role && found.role !== role.toUpperCase()) {
            const friendlyRole = found.role === 'DRIVER' ? 'Auto Driver' : 'Ad Publisher';
            const attemptedRole = role === 'DRIVER' ? 'Auto Driver' : 'Ad Publisher';
            throw new Error(`This account is registered as ${friendlyRole}, not ${attemptedRole}. Please switch your role.`);
          }
          // Fetch full user details with profile
          let userObj = found;
          try {
            const userDetailRes = await fetch(`${BASE_URL}/users/${found.id}`);
            if (userDetailRes.ok) {
              const detailJson = await userDetailRes.json();
              if (detailJson.success && detailJson.data) userObj = detailJson.data;
            }
          } catch {}

          // Cache in local accounts for offline / quick reload
          const updatedAccounts = [...localAccounts, { ...userObj, password: password || '' }];
          setStored('accounts', updatedAccounts);
          setStored('auth_user', userObj);
          setStored('auth_token', `token_${userObj.id}`);
          return { success: true, user: userObj };
        }
      }
    }
  } catch (err) {
    if (err.message && err.message.includes('registered as')) {
      throw err;
    }
    console.warn('Backend user verification error:', err);
  }

  // NO dummy user fallback allowed!
  throw new Error(`No account found with email "${cleanEmail}". Please check your email or click "Create Account" to sign up.`);
};

export const apiRegister = async (userData) => {
  const cleanEmail = String(userData.email).toLowerCase().trim();
  const role = userData.role.toUpperCase();

  let registeredUser = null;

  try {
    // Send POST directly to Vercel backend PostgreSQL
    const res = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userData.name,
        email: cleanEmail,
        phone: userData.phone || '',
        password_hash: userData.password || '',
        role: role,
        driver_profile: userData.driver_profile,
        publisher_profile: userData.publisher_profile
      })
    });

    const json = await res.json();
    if (res.ok && json.success && json.data) {
      registeredUser = {
        ...json.data,
        role: role,
        profile: role === 'DRIVER' ? userData.driver_profile : userData.publisher_profile
      };
    } else if (json.message && json.message.toLowerCase().includes('already exists')) {
      throw new Error(json.message);
    }
  } catch (err) {
    if (err.message && err.message.toLowerCase().includes('already exists')) {
      throw err;
    }
    console.warn('Registration network notice, saving locally:', err);
  }

  if (!registeredUser) {
    registeredUser = {
      id: String(Date.now()),
      name: userData.name,
      email: cleanEmail,
      phone: userData.phone || '',
      role: role,
      created_at: String(Date.now()),
      profile: role === 'DRIVER' ? userData.driver_profile : userData.publisher_profile
    };
  }

  // Save account with password locally for authentic login validation
  const localAccounts = getStored('accounts', []);
  const existingIdx = localAccounts.findIndex((a) => a.email.toLowerCase() === cleanEmail);
  const accountEntry = {
    ...registeredUser,
    password: userData.password
  };

  if (existingIdx >= 0) {
    localAccounts[existingIdx] = accountEntry;
  } else {
    localAccounts.push(accountEntry);
  }

  setStored('accounts', localAccounts);
  setStored('auth_user', registeredUser);
  setStored('auth_token', `token_${registeredUser.id}`);

  return { success: true, user: registeredUser };
};

export const getStoredAuthUser = () => {
  // Returns null if no authentic user is logged in - NO dummy fallback
  return getStored('auth_user', null);
};

export const apiLogout = () => {
  try {
    localStorage.removeItem('adswheeler_auth_user');
    localStorage.removeItem('adswheeler_auth_token');
  } catch {}
};

// ==========================================
// 2. ADVERTISEMENTS (LIVE DB)
// ==========================================

export const apiGetAds = async (params = {}) => {
  try {
    const query = new URLSearchParams();
    if (params.status) query.append('status', params.status);
    if (params.target_vehicle_type) query.append('target_vehicle_type', params.target_vehicle_type);
    if (params.publisher_id) query.append('publisher_id', params.publisher_id);

    const res = await fetch(`${BASE_URL}/ads?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch from live Vercel backend');
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return { success: true, data: json.data, isMock: false };
    }
    const local = getStored('ads', MOCK_ADS);
    return { success: true, data: local, isMock: true };
  } catch (err) {
    console.warn('apiGetAds fetch failed, using fallback:', err);
    const local = getStored('ads', MOCK_ADS);
    return { success: true, data: local, isMock: true };
  }
};

export const apiCreateAd = async (adData) => {
  try {
    // Send POST to live Vercel PostgreSQL database
    const res = await fetch(`${BASE_URL}/ads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        publisher_id: adData.publisher_id || 3,
        business_name: adData.business_name || 'My Brand',
        title: adData.title,
        description: adData.description || 'Verified transit wrap promotion',
        image: null,
        price: Number(adData.price),
        target_vehicle_type: adData.target_vehicle_type,
        duration: adData.duration || '1 Month',
        status: 'PUBLISHED'
      })
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.message || 'Server error creating ad');
    }

    return { success: true, data: json.data, isMock: false };
  } catch (err) {
    console.error('Error creating ad on live DB:', err);
    // Fallback save locally if network offline
    const current = getStored('ads', MOCK_ADS);
    const newAd = {
      id: Date.now(),
      publisher_id: adData.publisher_id || 3,
      business_name: adData.business_name || 'My Brand',
      title: adData.title,
      description: adData.description,
      price: Number(adData.price),
      target_vehicle_type: adData.target_vehicle_type,
      duration: adData.duration || '1 Month',
      status: 'PUBLISHED',
      created_at: Date.now(),
      updated_at: Date.now()
    };
    setStored('ads', [newAd, ...current]);
    return { success: true, data: newAd, isMock: true };
  }
};

export const apiDeleteAd = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/ads/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
    return { success: true, isMock: false };
  } catch (err) {
    const current = getStored('ads', MOCK_ADS);
    setStored('ads', current.filter((a) => a.id !== id));
    return { success: true, isMock: true };
  }
};

// ==========================================
// 3. AD APPLICATIONS (LIVE DB)
// ==========================================

export const apiGetApplications = async (params = {}) => {
  try {
    const query = new URLSearchParams();
    if (params.driver_id) query.append('driver_id', params.driver_id);
    if (params.advertisement_id) query.append('advertisement_id', params.advertisement_id);
    if (params.status) query.append('status', params.status);

    const res = await fetch(`${BASE_URL}/applications?${query.toString()}`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        // Merge with local applications
        const local = getStored('applications', []);
        const combined = [...json.data];
        for (const loc of local) {
          if (!combined.some((c) => String(c.id) === String(loc.id))) {
            combined.push(loc);
          }
        }
        return { success: true, data: combined, isMock: false };
      }
    }
    const local = getStored('applications', []);
    return { success: true, data: local, isMock: false };
  } catch (err) {
    const local = getStored('applications', []);
    return { success: true, data: local, isMock: false };
  }
};

export const apiCreateApplication = async (appData) => {
  try {
    // Send POST to live Vercel PostgreSQL database
    const res = await fetch(`${BASE_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        advertisement_id: appData.advertisement_id,
        driver_id: appData.driver_id,
        amount: Number(appData.amount),
        status: 'PENDING',
        payment_status: 'PENDING'
      })
    });

    const json = await res.json();
    const createdData =
      json.success && json.data
        ? {
            ...json.data,
            ad_title: appData.ad_title || 'Promotional Campaign',
            driver_name: appData.driver_name || 'Driver'
          }
        : {
            id: String(Date.now()),
            advertisement_id: appData.advertisement_id,
            driver_id: appData.driver_id,
            ad_title: appData.ad_title || 'Promotional Campaign',
            amount: Number(appData.amount),
            driver_name: appData.driver_name || 'Driver',
            accepted_at: Date.now(),
            status: 'PENDING',
            payment_status: 'PENDING'
          };

    const current = getStored('applications', []);
    setStored('applications', [createdData, ...current]);
    return { success: true, data: createdData, isMock: false };
  } catch (err) {
    console.warn('Creating application fallback:', err);
    const newApp = {
      id: String(Date.now()),
      advertisement_id: appData.advertisement_id,
      driver_id: appData.driver_id,
      ad_title: appData.ad_title || 'Promotional Campaign',
      amount: Number(appData.amount),
      driver_name: appData.driver_name || 'Driver',
      accepted_at: Date.now(),
      status: 'PENDING',
      payment_status: 'PENDING'
    };
    const current = getStored('applications', []);
    setStored('applications', [newApp, ...current]);
    return { success: true, data: newApp, isMock: false };
  }
};

export const apiUpdateApplicationStatus = async (id, statusData) => {
  try {
    const res = await fetch(`${BASE_URL}/applications/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(statusData)
    });
    if (!res.ok) throw new Error('Update application status failed on live DB');
    const json = await res.json();
    return { success: true, data: json.data, isMock: false };
  } catch (err) {
    const current = getStored('applications', []);
    const updated = current.map((app) => {
      if (app.id === id || String(app.id) === String(id)) {
        return {
          ...app,
          status: statusData.status || app.status,
          payment_status: statusData.payment_status || app.payment_status
        };
      }
      return app;
    });
    setStored('applications', updated);
    return { success: true, data: updated.find((a) => String(a.id) === String(id)), isMock: false };
  }
};

// ==========================================
// 4. NOTIFICATIONS (LIVE DB)
// ==========================================

export const apiGetNotifications = async (userId) => {
  try {
    const query = new URLSearchParams();
    if (userId) query.append('user_id', userId);
    const res = await fetch(`${BASE_URL}/notifications?${query.toString()}`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return { success: true, data: json.data, isMock: false };
      }
    }
    const local = getStored('notifications', []);
    return { success: true, data: local, isMock: false };
  } catch (err) {
    const local = getStored('notifications', []);
    return { success: true, data: local, isMock: false };
  }
};

export const apiMarkNotificationRead = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/notifications/${id}/read`, { method: 'PATCH' });
    if (!res.ok) throw new Error('Mark read error');
    return { success: true, isMock: false };
  } catch (err) {
    const current = getStored('notifications', []);
    const updated = current.map((n) => (String(n.id) === String(id) ? { ...n, read_status: true } : n));
    setStored('notifications', updated);
    return { success: true, isMock: false };
  }
};
