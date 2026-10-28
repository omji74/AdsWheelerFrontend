import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CampaignProvider } from './context/CampaignContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import InstantQuotePage from './pages/InstantQuotePage';
import AiDesignerPage from './pages/AiDesignerPage';
import FleetPage from './pages/FleetPage';
import PackagesPage from './pages/PackagesPage';
import EarningsPage from './pages/EarningsPage';
import AuthPage from './pages/AuthPage';
import DriverDashboardPage from './pages/DriverDashboardPage';
import DriverProfilePage from './pages/DriverProfilePage';
import AdvertiserDashboardPage from './pages/AdvertiserDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CampaignProvider>
          <Routes>
            {/* Standalone Auth Routes */}
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/auth" element={<AuthPage />} />

            {/* Application Shell Routes with Shared Layout */}
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="marketplace" element={<MarketplacePage />} />
              <Route path="instant-quote" element={<InstantQuotePage />} />
              <Route path="ai-designer" element={<AiDesignerPage />} />
              <Route path="fleet" element={<FleetPage />} />
              <Route path="packages" element={<PackagesPage />} />
              <Route path="earnings" element={<EarningsPage />} />

              {/* Protected Driver Routes */}
              <Route
                path="driver"
                element={
                  <ProtectedRoute allowedRoles={['DRIVER']}>
                    <DriverDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="driver/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['DRIVER']}>
                    <DriverDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="driver/profile"
                element={
                  <ProtectedRoute allowedRoles={['DRIVER']}>
                    <DriverProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Protected Advertiser / Publisher Routes */}
              <Route
                path="advertiser"
                element={
                  <ProtectedRoute allowedRoles={['PUBLISHER']}>
                    <AdvertiserDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="advertiser/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['PUBLISHER']}>
                    <AdvertiserDashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </CampaignProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
