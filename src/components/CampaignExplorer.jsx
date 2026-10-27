import React, { useState, useMemo } from 'react';
import {
  Flaticon,
  AutoRickshawBadge,
  ElectricTotoBadge,
  FaBullhorn,
  FaIndianRupeeSign,
  FaArrowRight
} from './RichIcons';
import { RefreshCw, Search } from 'lucide-react';
import AdCard from './AdCard';
import AdDetailSlideOver from './AdDetailSlideOver';

export default function CampaignExplorer({
  ads = [],
  onApply,
  appliedAdIds = [],
  userRole,
  onOpenCreateAd,
  loading = false
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('ALL'); // 'ALL' | 'AUTO_RICKSHAW' | 'E_RICKSHAW'
  const [selectedAd, setSelectedAd] = useState(null);
  const [highYieldOnly, setHighYieldOnly] = useState(false);

  const filterChips = [
    { id: 'ALL', label: 'All Vehicles', flaticon: 'apps' },
    { id: 'AUTO_RICKSHAW', label: 'Auto Rickshaw', badge: AutoRickshawBadge },
    { id: 'E_RICKSHAW', label: 'E-Rickshaw EV', badge: ElectricTotoBadge }
  ];

  const filteredAds = useMemo(() => {
    return ads.filter((ad) => {
      const matchesSearch =
        ad.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ad.city && ad.city.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesVehicle =
        vehicleFilter === 'ALL' ||
        ad.target_vehicle_type === vehicleFilter ||
        ad.target_vehicle_type === 'BOTH';

      const matchesYield = !highYieldOnly || Number(ad.price) >= 4000;

      return matchesSearch && matchesVehicle && matchesYield;
    });
  }, [ads, searchTerm, vehicleFilter, highYieldOnly]);

  return (
    <div className="space-y-4 sm:space-y-6 my-6 sm:my-10">
      {/* Title & Headline */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 font-display tracking-tight">
            {userRole === 'DRIVER'
              ? 'Available Campaigns to Accept'
              : userRole === 'PUBLISHER'
              ? 'Live Marketplace Campaigns'
              : 'Explore Transit Brand Campaigns'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            {userRole === 'DRIVER'
              ? 'Tap "Accept Campaign" on any ad below to register your vehicle and receive direct monthly UPI payouts.'
              : 'Browse active vehicle wraps across Delhi NCR, Mumbai, and Bengaluru.'}
          </p>
        </div>

        {userRole === 'PUBLISHER' && (
          <button
            onClick={onOpenCreateAd}
            className="w-full sm:w-auto px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer active:scale-98"
          >
            <FaBullhorn className="w-3.5 h-3.5" />
            <span>+ Post New Campaign</span>
          </button>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Flaticon
            name="search"
            style="rr"
            className="text-xs text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search campaigns, brands, or cities..."
            className="w-full h-10 bg-stone-50/70 border border-stone-200 rounded-xl pl-9 pr-3.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 focus:bg-white transition-all"
          />
        </div>

        {/* Filter Chips (Horizontal scrolling on small screens) */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {filterChips.map((chip) => {
            const isActive = vehicleFilter === chip.id;
            const BadgeComp = chip.badge;
            return (
              <button
                key={chip.id}
                onClick={() => setVehicleFilter(chip.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                }`}
              >
                {BadgeComp ? (
                  <BadgeComp size={16} />
                ) : (
                  <Flaticon name={chip.flaticon} style="rr" className="text-xs" />
                )}
                <span>{chip.label}</span>
              </button>
            );
          })}

          {/* High Yield Filter Chip */}
          <button
            onClick={() => setHighYieldOnly(!highYieldOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              highYieldOnly
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
            }`}
          >
            <FaIndianRupeeSign className="w-2.5 h-2.5" />
            <span>₹4k+/mo High Yield</span>
          </button>
        </div>
      </div>

      {/* Grid Content / Skeletons / Empty States */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4 animate-pulse"
            >
              <div className="flex justify-between items-center">
                <div className="w-24 h-5 bg-stone-200 rounded-full" />
                <div className="w-16 h-5 bg-stone-200 rounded-md" />
              </div>
              <div className="space-y-2">
                <div className="w-32 h-3 bg-stone-200 rounded" />
                <div className="w-full h-4 bg-stone-200 rounded" />
              </div>
              <div className="w-full h-10 bg-stone-100 rounded-xl" />
              <div className="w-full h-8 bg-stone-200 rounded-xl pt-2" />
            </div>
          ))}
        </div>
      ) : filteredAds.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-stone-200 shadow-xs space-y-3 max-w-lg mx-auto my-6">
          <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900">No campaigns found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
            We couldn't find any ad campaigns matching "{searchTerm}". Try clearing your keywords or filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setVehicleFilter('ALL');
              setHighYieldOnly(false);
            }}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredAds.map((ad) => (
            <AdCard
              key={ad.id}
              ad={ad}
              onApply={onApply}
              isApplied={appliedAdIds.includes(ad.id) || appliedAdIds.includes(String(ad.id))}
              userRole={userRole}
              onSelectAd={(item) => setSelectedAd(item)}
            />
          ))}
        </div>
      )}

      {/* Slide-Over Detail Sheet */}
      <AdDetailSlideOver
        ad={selectedAd}
        isOpen={Boolean(selectedAd)}
        onClose={() => setSelectedAd(null)}
        onApply={onApply}
        isApplied={
          selectedAd
            ? appliedAdIds.includes(selectedAd.id) || appliedAdIds.includes(String(selectedAd.id))
            : false
        }
        userRole={userRole}
      />
    </div>
  );
}
