import React from 'react';
import { useNavigate } from 'react-router-dom';
import RealFleetShowcase from '../components/RealFleetShowcase';
import VehicleSimulator from '../components/VehicleSimulator';
import GpsPhotoVerification from '../components/GpsPhotoVerification';
import CampaignDashboard from '../components/CampaignDashboard';

export default function FleetPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10 sm:space-y-12">
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
          Verified Transit Network
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-stone-900 font-display tracking-tight mt-2">
          Real Fleet Showcase & Tracking
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Explore real road-tested campaign wraps, GPS verification logs, live kilometer tracking, and our 3D vehicle visualizer.
        </p>
      </div>

      <RealFleetShowcase
        onInstantQuote={() => navigate('/instant-quote')}
        onOpenAiDesigner={() => navigate('/ai-designer')}
      />

      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs">
        <h2 className="text-lg font-bold text-stone-900 font-display mb-1">
          Interactive Vehicle Simulator
        </h2>
        <p className="text-xs text-stone-500 mb-6">
          Toggle wrap options, lighting, and vehicle angles to preview branded fleet impact.
        </p>
        <VehicleSimulator />
      </div>

      <GpsPhotoVerification />

      <CampaignDashboard />
    </div>
  );
}
