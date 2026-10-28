import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getStoredAuthUser,
  apiLogin,
  apiRegister,
  apiLogout,
  apiUpdateUserProfile
} from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [guestMode, setGuestMode] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Restore stored session on mount
  useEffect(() => {
    try {
      const stored = getStoredAuthUser();
      if (stored) {
        setCurrentUser(stored);
      }
    } catch (e) {
      console.warn('Failed to read auth user from storage', e);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const res = await apiLogin(credentials);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      setGuestMode(false);
      return res.user;
    }
    throw new Error('Login failed');
  };

  const register = async (userData) => {
    const res = await apiRegister(userData);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      setGuestMode(false);
      return res.user;
    }
    throw new Error('Registration failed');
  };

  const logout = () => {
    apiLogout();
    setCurrentUser(null);
    setGuestMode(false);
  };

  const updateProfile = async (updatedData) => {
    if (!currentUser) return;
    const res = await apiUpdateUserProfile(currentUser.id, updatedData);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      return res.user;
    }
    throw new Error(res.error || 'Failed to update profile');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        guestMode,
        setGuestMode,
        authLoading,
        login,
        register,
        logout,
        updateProfile,
        isDriver: currentUser?.role === 'DRIVER',
        isPublisher: currentUser?.role === 'PUBLISHER',
        isAuthenticated: !!currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
