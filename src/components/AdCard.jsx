import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flaticon,
  AutoRickshawBadge,
  ElectricTotoBadge,
  FaIndianRupeeSign,
  FaLocationDot,
  FaArrowRight,
  FaCircleCheck,
  FaRegClock
} from './RichIcons';
import {
  Users,
  ChevronDown,
  ChevronUp,
  Share2
} from 'lucide-react';

export default function AdCard({ ad, onApply, isApplied, userRole = 'DRIVER', onSelectAd }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const getVehicleBadge = (type) => {
    switch (type) {
      case 'AUTO_RICKSHAW':
        return {
          label: 'Auto Rickshaw',
          bg: 'bg-amber-50 text-amber-900 border-amber-200',
          BadgeComp: AutoRickshawBadge
        };
      case 'E_RICKSHAW':
        return {
          label: 'E-Rickshaw EV',
          bg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
          BadgeComp: ElectricTotoBadge
        };
      default:
        return {
          label: 'Auto & E-Rickshaw',
          bg: 'bg-stone-100 text-stone-800 border-stone-200',
          BadgeComp: AutoRickshawBadge
        };
    }
  };

  const badge = getVehicleBadge(ad.target_vehicle_type);
  const BadgeComp = badge.BadgeComp;

  const handleShare = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <div className="p-4 sm:p-5">
        {/* Top Badges & Pricing */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badge.bg}`}
          >
            {BadgeComp && <BadgeComp size={16} />}
            <span>{badge.label}</span>
          </span>

          <div className="text-right">
            <span className="text-[10px] text-stone-400 font-semibold block uppercase tracking-wider">
              Monthly Payout
            </span>
            <div className="flex items-center justify-end font-extrabold text-stone-900 text-base sm:text-lg font-display">
              <FaIndianRupeeSign className="w-3.5 h-3.5 text-teal-700 mr-0.5" />
              <span>{Number(ad.price).toLocaleString('en-IN')}</span>
              <span className="text-xs text-stone-500 font-normal ml-0.5">/mo</span>
            </div>
          </div>
        </div>

        {/* Title & Brand */}
        <div className="mb-2">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
            <span className="font-bold text-stone-800">{ad.business_name || 'Verified Advertiser'}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-stone-600">
              <FaLocationDot className="w-2.5 h-2.5 text-indigo-500" />
              {ad.city || 'Delhi NCR'}
            </span>
          </div>

          <h4 className="text-sm sm:text-base font-bold text-stone-900 line-clamp-1">
            {ad.title}
          </h4>
        </div>

        {/* Short Summary */}
        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
          {ad.description ||
            'Full vehicle wrap campaign with verified daily commuter route impressions.'}
        </p>

        {/* Expandable Accordion Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className="mt-3 pt-3 border-t border-stone-100 space-y-2 text-xs"
            >
              <div className="grid grid-cols-2 gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-stone-700">
                <div className="flex items-center gap-1.5">
                  <FaRegClock className="w-3.5 h-3.5 text-stone-400" />
                  <span>
                    Duration: <strong>{ad.duration || '1 Month'}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flaticon name="eye" style="rr" className="text-xs text-stone-400" />
                  <span>
                    Views: <strong>{ad.impressions_estimate || '140k/mo'}</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                <span>Free wrap installation at hub</span>
                <span className="font-bold text-teal-700">Zero Driver Cost</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Controls & Primary Action Button */}
      <div className="px-4 sm:px-5 py-3 border-t border-stone-100 bg-stone-50/60 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <span>{isExpanded ? 'Less' : 'Details'}</span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            type="button"
            onClick={handleShare}
            title="Share ad"
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          {copied && <span className="text-[10px] text-teal-700 font-bold">Copied!</span>}
        </div>

        {/* Actions based on role */}
        <div className="flex items-center gap-2">
          {onSelectAd && (
            <button
              type="button"
              onClick={() => onSelectAd(ad)}
              className="text-xs font-bold text-stone-600 hover:text-stone-900 px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 transition-colors cursor-pointer"
            >
              Preview
            </button>
          )}

          {userRole === 'PUBLISHER' ? (
            <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2.5 py-1.5 rounded-lg border border-stone-200">
              Active in Market
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onApply(ad)}
              disabled={isApplied}
              className={`py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 ${
                isApplied
                  ? 'bg-stone-200 text-stone-500 cursor-default'
                  : 'bg-teal-700 hover:bg-teal-800 text-white'
              }`}
            >
              {isApplied ? (
                <>
                  <FaCircleCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span>Enrolled</span>
                </>
              ) : (
                <>
                  <span>Accept Campaign</span>
                  <FaArrowRight className="w-3 h-3" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
