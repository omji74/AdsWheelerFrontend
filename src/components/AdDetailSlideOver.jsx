import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flaticon,
  AutoRickshawBadge,
  ElectricTotoBadge,
  RupeePayoutBadge,
  VerifiedShieldBadge,
  UpiPaymentBadge,
  FaIndianRupeeSign,
  FaLocationDot,
  FaArrowRight,
  FaCircleCheck,
  FaRegClock,
  FaCarSide
} from './RichIcons';
import { X } from 'lucide-react';

export default function AdDetailSlideOver({ ad, isOpen, onClose, onApply, isApplied, userRole }) {
  if (!ad) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex sm:pl-10 w-full justify-end">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-full sm:w-screen sm:max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col justify-between h-full"
            >
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-stone-100 flex items-center justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                    {ad.target_vehicle_type === 'AUTO_RICKSHAW' ? (
                      <>
                        <AutoRickshawBadge size={16} /> Auto Rickshaw
                      </>
                    ) : ad.target_vehicle_type === 'E_RICKSHAW' ? (
                      <>
                        <ElectricTotoBadge size={16} /> E-Rickshaw EV
                      </>
                    ) : (
                      <>
                        <AutoRickshawBadge size={16} /> Universal Fleet
                      </>
                    )}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 mt-2">
                    {ad.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    By {ad.business_name || 'Verified Advertiser'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-6 space-y-5 flex-1 overflow-y-auto">
                {/* Payout Metric Card */}
                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-stone-500 font-semibold">
                      Monthly Cash Payout
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
                        ₹{Number(ad.price).toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-stone-500 font-medium">/ month per vehicle</span>
                    </div>
                    <p className="text-xs text-teal-700 mt-2 flex items-center gap-1.5 font-semibold">
                      <VerifiedShieldBadge size={16} />
                      Direct monthly UPI transfer to your bank account
                    </p>
                  </div>
                  <RupeePayoutBadge size={44} />
                </div>

                {/* Key Specifications */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Campaign Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 bg-stone-50/70 rounded-xl border border-stone-200 text-xs">
                      <span className="text-stone-400 block mb-0.5">Duration</span>
                      <span className="font-bold text-stone-900 flex items-center gap-1.5">
                        <FaRegClock className="w-3.5 h-3.5 text-stone-500" />
                        {ad.duration || '1 Month'}
                      </span>
                    </div>
                    <div className="p-3 bg-stone-50/70 rounded-xl border border-stone-200 text-xs">
                      <span className="text-stone-400 block mb-0.5">Target City</span>
                      <span className="font-bold text-stone-900 flex items-center gap-1.5">
                        <FaLocationDot className="w-3.5 h-3.5 text-stone-500" />
                        {ad.city || 'Delhi NCR'}
                      </span>
                    </div>
                    <div className="p-3 bg-stone-50/70 rounded-xl border border-stone-200 text-xs">
                      <span className="text-stone-400 block mb-0.5">Monthly Views</span>
                      <span className="font-bold text-stone-900 flex items-center gap-1.5">
                        <Flaticon name="eye" style="rr" className="text-xs text-stone-500" />
                        {ad.impressions_estimate || '140k+ views'}
                      </span>
                    </div>
                    <div className="p-3 bg-stone-50/70 rounded-xl border border-stone-200 text-xs">
                      <span className="text-stone-400 block mb-0.5">Vehicle Slots</span>
                      <span className="font-bold text-teal-700 flex items-center gap-1.5">
                        <FaCarSide className="w-3.5 h-3.5 text-teal-700" />
                        {ad.slots_left ? `${ad.slots_left} open` : 'Open'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                    Wrap Placement & Guidelines
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed bg-stone-50/70 p-3.5 rounded-xl border border-stone-200">
                    {ad.description ||
                      'Full vehicle wrap campaign with verified daily commuter route impressions. Weatherproof 3M wrap materials provided free of cost by advertiser.'}
                  </p>
                </div>

                {/* Free Installation Note */}
                <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 space-y-1">
                  <span className="font-bold block">Zero Cost to Driver:</span>
                  <p className="text-[11px] text-teal-800 leading-relaxed">
                    Installation and removal are 100% free at our partner hubs. Zero vehicle paint damage guaranteed.
                  </p>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-4 sm:p-6 border-t border-stone-100 bg-stone-50/80 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-bold text-stone-600 hover:text-stone-900 rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
                {userRole === 'DRIVER' || userRole === 'PUBLIC' ? (
                  <button
                    onClick={() => {
                      onApply(ad);
                      onClose();
                    }}
                    disabled={isApplied}
                    className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-98 ${
                      isApplied
                        ? 'bg-stone-200 text-stone-500 cursor-default'
                        : 'bg-teal-700 hover:bg-teal-800 text-white'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <FaCircleCheck className="w-4 h-4 text-teal-600" />
                        <span>Enrolled</span>
                      </>
                    ) : (
                      <>
                        <span>Accept This Campaign</span>
                        <FaArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                ) : null}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
