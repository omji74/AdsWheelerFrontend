import React from 'react';
import { Link } from 'react-router-dom';
import { AutoRickshawBadge, ElectricTotoBadge, Flaticon } from '../components/RichIcons';
import DriverPortal from '../components/DriverPortal';
import VehicleSimulator from '../components/VehicleSimulator';
import EarningsCalculator from '../components/EarningsCalculator';
import CampaignExplorer from '../components/CampaignExplorer';
import { useAuth } from '../context/AuthContext';
import { useCampaign } from '../context/CampaignContext';
import { User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function DriverDashboardPage() {
  const { currentUser } = useAuth();
  const {
    ads,
    loadingAds,
    applications,
    appliedAdIds,
    applyToCampaign
  } = useCampaign();

  const isEv = currentUser?.profile?.vehicle_type === 'E_RICKSHAW';

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Driver Quick Bar */}
      <div className="bg-gradient-to-r from-teal-800 to-teal-900 text-white rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20">
            {isEv ? <ElectricTotoBadge size={36} /> : <AutoRickshawBadge size={36} />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold font-display">
                Namaste, {currentUser?.name?.split(' ')[0] || 'Partner Driver'}!
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                Active Transit Fleet
              </span>
            </div>
            <p className="text-xs text-teal-100/80 mt-0.5">
              Plate: <span className="font-mono font-bold text-white">{currentUser?.profile?.vehicle_registration_number || 'Transit Registered'}</span> • {currentUser?.profile?.city || 'Delhi NCR'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/driver/profile"
            className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center gap-1.5 transition-colors border border-white/20 cursor-pointer"
          >
            <User className="w-3.5 h-3.5" />
            <span>Driver Profile & UPI</span>
          </Link>
          <Link
            to="/marketplace"
            className="px-3.5 py-2 rounded-xl bg-white text-teal-900 hover:bg-teal-50 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <span>+ Accept Campaigns</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Driver Contracts & Payouts Ledger */}
      <DriverPortal
        applications={applications}
        onBrowseMore={() => {
          const el = document.getElementById('driver-marketplace-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        currentUser={currentUser}
      />

      {/* Embedded Marketplace for Direct Enrollment */}
      <div id="driver-marketplace-section" className="pt-4">
        <div className="mb-3 p-3.5 bg-teal-50/70 border border-teal-200/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <AutoRickshawBadge size={24} />
            <span className="text-xs font-bold text-teal-900">
              Driver Marketplace: Accept brand campaigns below for your Auto or E-Rickshaw.
            </span>
          </div>
          <span className="text-[11px] font-semibold text-teal-700 bg-white px-2.5 py-0.5 rounded-full border border-teal-200 shrink-0 self-start sm:self-auto">
            Direct UPI Payouts
          </span>
        </div>

        <CampaignExplorer
          ads={ads}
          onApply={applyToCampaign}
          appliedAdIds={appliedAdIds}
          userRole="DRIVER"
          loading={loadingAds}
        />
      </div>

      {/* Vehicle Simulator */}
      <div className="my-8">
        <VehicleSimulator />
      </div>

      {/* Guaranteed Driver Earnings Calculator */}
      <EarningsCalculator
        onApplyClick={() => {
          const el = document.getElementById('driver-marketplace-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
}
