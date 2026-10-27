import React, { useState } from 'react';
import {
  Flaticon,
  AutoRickshawBadge,
  ElectricTotoBadge,
  RupeePayoutBadge,
  VerifiedShieldBadge,
  UpiPaymentBadge,
  FaArrowRight,
  FaIndianRupeeSign,
  FaGasPump
} from './RichIcons';

export default function EarningsCalculator({ onApplyClick }) {
  const [vehicle, setVehicle] = useState('AUTO_RICKSHAW');
  const [dailyKm, setDailyKm] = useState(80);
  const [activeMonths, setActiveMonths] = useState(6);

  const baseRate = vehicle === 'AUTO_RICKSHAW' ? 45 : 40;
  const monthlyEst = Math.round(3000 + (dailyKm - 40) * baseRate);
  const totalEst = monthlyEst * activeMonths;
  const fuelSavingsEst = Math.round(monthlyEst * 0.35);

  return (
    <div id="earnings-calc" className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 border border-stone-200 shadow-xs my-6 sm:my-10">
      <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              Driver Income Estimator
            </span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-stone-900 font-display mt-1.5">
              Calculate Your Extra Monthly Earnings
            </h2>
          </div>
          <p className="text-xs text-stone-500 max-w-xs self-start sm:self-auto">
            Zero upfront fee. No route deviations. Just paste certified brand wraps on your vehicle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-5 bg-stone-50/70 p-5 rounded-xl border border-stone-200/70">
            {/* Vehicle Selector */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-2">
                Select Vehicle Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setVehicle('AUTO_RICKSHAW')}
                  className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
                    vehicle === 'AUTO_RICKSHAW'
                      ? 'border-teal-700 bg-white text-stone-900 shadow-xs ring-1 ring-teal-700/20'
                      : 'border-stone-200 bg-white/60 text-stone-600 hover:bg-white'
                  }`}
                >
                  <AutoRickshawBadge size={36} />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Auto Rickshaw</span>
                    <span className="text-[11px] text-stone-500 block">CNG / Petrol Auto</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setVehicle('E_RICKSHAW')}
                  className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
                    vehicle === 'E_RICKSHAW'
                      ? 'border-teal-700 bg-white text-stone-900 shadow-xs ring-1 ring-teal-700/20'
                      : 'border-stone-200 bg-white/60 text-stone-600 hover:bg-white'
                  }`}
                >
                  <ElectricTotoBadge size={36} />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">E-Rickshaw</span>
                    <span className="text-[11px] text-stone-500 block">Battery EV Toto</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Daily Distance Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5 text-xs">
                <span className="font-semibold text-stone-700">Daily Driving Mileage</span>
                <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {dailyKm} km / day
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="150"
                step="5"
                value={dailyKm}
                onChange={(e) => setDailyKm(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
              />
              <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                <span>40 km (Part-time)</span>
                <span>80 km (Regular)</span>
                <span>150 km (Full-time)</span>
              </div>
            </div>

            {/* Campaign Duration Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5 text-xs">
                <span className="font-semibold text-stone-700">Campaign Commitment</span>
                <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {activeMonths} Months
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={activeMonths}
                onChange={(e) => setActiveMonths(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
              />
              <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                <span>1 Month trial</span>
                <span>6 Months</span>
                <span>12 Months (Max Bonus)</span>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-stone-50/70 rounded-xl p-5 border border-stone-200/80 space-y-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block">
                Estimated Monthly Income
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl lg:text-4xl font-extrabold text-stone-900 font-display">
                  ₹{monthlyEst.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-stone-500">/ month</span>
              </div>
              <p className="text-[11px] text-stone-600 mt-1.5 flex items-center gap-1.5">
                <FaGasPump className="w-3.5 h-3.5 text-teal-700" />
                Offsets approx ₹{fuelSavingsEst.toLocaleString('en-IN')}/mo of your fuel/charging costs
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-white border border-stone-200/80 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Total for {activeMonths} Months:</span>
                <span className="font-bold text-stone-900">₹{totalEst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Contract Completion Bonus:</span>
                <span className="font-bold text-teal-700">+ ₹1,200</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Installation & Removal:</span>
                <span className="font-bold text-stone-800">₹0 (100% Free)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onApplyClick}
              className="w-full py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer active:scale-98"
            >
              <span>Explore High Payout Ads</span>
              <FaArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <VerifiedShieldBadge size={16} /> Automated UPI Payout
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Flaticon name="wrench" style="rr" className="text-xs text-teal-700" /> 24hr Hub Wrap Install
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
