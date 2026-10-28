import React from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignExplorer from '../components/CampaignExplorer';
import { useAuth } from '../context/AuthContext';
import { useCampaign } from '../context/CampaignContext';
import { AutoRickshawBadge, ElectricTotoBadge } from '../components/RichIcons';

export default function MarketplacePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const {
    ads,
    loadingAds,
    appliedAdIds,
    applyToCampaign,
    setIsCreateSlideOverOpen
  } = useCampaign();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
              Live Fleet Inventory
            </span>
            <span className="text-xs text-stone-400">• Verified Payouts</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-stone-900 font-display tracking-tight">
            Transit Ad Marketplace
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Browse verified outdoor wrap campaigns for CNG Auto Rickshaws and Electric Toto E-Rickshaws.
          </p>
        </div>

        {currentUser?.role === 'PUBLISHER' ? (
          <button
            onClick={() => setIsCreateSlideOverOpen(true)}
            className="py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
          >
            + Launch New Campaign
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-700">
              <AutoRickshawBadge size={20} />
              <span>CNG Autos</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-700">
              <ElectricTotoBadge size={20} />
              <span>EV E-Rickshaws</span>
            </div>
          </div>
        )}
      </div>

      <CampaignExplorer
        ads={ads}
        onApply={applyToCampaign}
        appliedAdIds={appliedAdIds}
        userRole={currentUser?.role || 'PUBLIC'}
        onOpenCreateAd={() => {
          if (currentUser?.role === 'PUBLISHER') {
            setIsCreateSlideOverOpen(true);
          } else {
            navigate('/auth?role=PUBLISHER&mode=signup');
          }
        }}
        loading={loadingAds}
      />
    </div>
  );
}
