import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdvertisingPackages from '../components/AdvertisingPackages';
import CityWiseTargeting from '../components/CityWiseTargeting';
import { useCampaign } from '../context/CampaignContext';

export default function PackagesPage() {
  const navigate = useNavigate();
  const { selectPackageForQuotation } = useCampaign();

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
          Transparent Rates
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-stone-900 font-display tracking-tight mt-2">
          Advertising Packages & Formats
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Choose from Full Hood Wraps, Back Panels, Interior Commuter Strips, or Rooftop Digital LED screens.
        </p>
      </div>

      <AdvertisingPackages
        onSelectPackage={(pkgId) => {
          selectPackageForQuotation(pkgId);
          navigate('/instant-quote');
        }}
      />

      <CityWiseTargeting onTargetCity={() => navigate('/instant-quote')} />
    </div>
  );
}
