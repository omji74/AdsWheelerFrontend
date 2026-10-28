import React from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import AuthPageComponent from '../components/AuthPage';
import { useAuth } from '../context/AuthContext';
import { useCampaign } from '../context/CampaignContext';

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { setCurrentUser, setGuestMode } = useAuth();
  const { showToast } = useCampaign();

  const roleParam = searchParams.get('role');
  const initialRole = roleParam === 'PUBLISHER' ? 'PUBLISHER' : 'DRIVER';

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setGuestMode(false);
    showToast(
      `Welcome ${user.name || 'Partner'}! Logged in as ${
        user.role === 'DRIVER' ? 'Auto Driver' : 'Ad Publisher'
      }`
    );

    // If there was a redirect path saved
    const from = location.state?.from?.pathname;
    if (from) {
      navigate(from, { replace: true });
    } else if (user.role === 'DRIVER') {
      navigate('/driver/dashboard', { replace: true });
    } else if (user.role === 'PUBLISHER') {
      navigate('/advertiser/dashboard', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  const handleContinueGuest = () => {
    setGuestMode(true);
    navigate('/', { replace: true });
  };

  return (
    <AuthPageComponent
      onAuthSuccess={handleAuthSuccess}
      onContinueGuest={handleContinueGuest}
      initialRole={initialRole}
    />
  );
}
