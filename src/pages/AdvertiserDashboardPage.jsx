import React from 'react';
import AdvertiserPortal from '../components/AdvertiserPortal';
import VehicleSimulator from '../components/VehicleSimulator';
import { useAuth } from '../context/AuthContext';
import { useCampaign } from '../context/CampaignContext';

export default function AdvertiserDashboardPage() {
  const { currentUser } = useAuth();
  const {
    ads,
    applications,
    setIsCreateSlideOverOpen,
    updateAppStatus,
    deleteCampaign
  } = useCampaign();

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Advertiser Management Portal */}
      <AdvertiserPortal
        ads={ads}
        applications={applications}
        onOpenCreateAd={() => setIsCreateSlideOverOpen(true)}
        onUpdateAppStatus={updateAppStatus}
        onDeleteAd={deleteCampaign}
        currentUser={currentUser}
      />

      {/* Transit Fleet Visualizer */}
      <div className="my-8">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-stone-900 font-display">
            Interactive Transit Fleet Visualizer
          </h3>
          <p className="text-xs text-stone-500">
            See how your branded vinyl wraps look on CNG Auto Rickshaws and Electric E-Rickshaws in real-time.
          </p>
        </div>
        <VehicleSimulator />
      </div>
    </div>
  );
}
