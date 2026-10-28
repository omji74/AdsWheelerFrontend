import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ allowedRoles, children }) {
  const { currentUser, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-teal-700/20 border-t-teal-700 rounded-full animate-spin" />
          <span className="text-xs text-stone-500 font-medium">Verifying session...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // If logged in as Driver but visits publisher route, or vice versa
    if (currentUser.role === 'DRIVER') {
      return <Navigate to="/driver/dashboard" replace />;
    }
    if (currentUser.role === 'PUBLISHER') {
      return <Navigate to="/advertiser/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}
