import React from 'react';
import { ArrowRight, ShieldCheck, TrendingUp, MapPin, Sparkles } from 'lucide-react';
import VehicleSimulator from './VehicleSimulator';

export default function HeroSection({ onExploreClick, onAdvertiserClick }) {
  return (
    <section className="relative pt-6 sm:pt-12 pb-4 sm:pb-6">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="max-w-3xl space-y-3.5 sm:space-y-4 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-bold text-stone-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
            <span>India's Verified Transit Rickshaw Advertising Network</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 font-display leading-[1.2]">
            Turn daily city commutes into moving brand billboards.
          </h1>

          <p className="text-xs sm:text-base text-stone-600 leading-relaxed max-w-2xl">
            AdsWheeler connects growing consumer brands with verified Auto and E-Rickshaw drivers. Drivers earn guaranteed monthly recurring income, while brands achieve high-frequency commuter visibility.
          </p>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
            <button
              onClick={onExploreClick}
              className="h-11 px-5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
            >
              <span>Explore Available Ads</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onAdvertiserClick}
              className="h-11 px-5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs sm:text-sm border border-stone-200 shadow-xs transition-colors flex items-center justify-center cursor-pointer active:scale-98"
            >
              <span>Launch Brand Campaign</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 text-xs text-stone-500 border-t border-stone-200">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              Guaranteed Direct UPI Settlement
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <TrendingUp className="w-4 h-4 text-teal-700" />
              140k+ Daily Street Eyeballs
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-teal-700" />
              Delhi NCR, Mumbai & Bengaluru
            </span>
          </div>
        </div>

        {/* Embedded Simulator */}
        <div className="mt-4 sm:mt-6">
          <VehicleSimulator />
        </div>
      </div>
    </section>
  );
}
