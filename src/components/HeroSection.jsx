import React from 'react';
import {
  Flaticon,
  VerifiedShieldBadge,
  TargetRouteBadge,
  AutoRickshawBadge,
  FaArrowRight,
  FaBullhorn,
  FaLocationDot,
  FaTv,
  FaWandMagicSparkles,
  FaWhatsapp,
  FaFileInvoiceDollar,
  FaCamera
} from './RichIcons';

export default function HeroSection({
  onExploreClick,
  onAdvertiserClick,
  onInstantQuoteClick,
  onAiDesignerClick,
  onFleetShowcaseClick,
  onGpsVerificationClick
}) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-6 sm:pt-10 pb-4 sm:pb-6">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          <div className="lg:col-span-7 space-y-4">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-xs font-bold text-teal-800 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>BrandOnAuto Inspired • India's #1 Digital Auto Advertising Network</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-900 font-display leading-[1.15]">
              Turn 50,000+ Auto Rickshaws Into High-Impact Moving Digital Screens.
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base text-stone-600 leading-relaxed">
              Unmissable eye-level branding in India's peak bumper-to-bumper traffic. From 22" commercial rear LED screens to full 3M vinyl hood wraps, complete with 100% GPS photo audits and guaranteed driver payouts.
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={onInstantQuoteClick || (() => scrollTo('instant-quotation'))}
                className="h-11 px-5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95"
              >
                <FaFileInvoiceDollar className="w-4 h-4" />
                <span>Instant Quotation</span>
              </button>

              <button
                type="button"
                onClick={onAiDesignerClick || (() => scrollTo('ai-ad-designer'))}
                className="h-11 px-5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95"
              >
                <FaWandMagicSparkles className="w-4 h-4 text-amber-300" />
                <span>AI Ad Designer</span>
              </button>

              <button
                type="button"
                onClick={onFleetShowcaseClick || (() => scrollTo('real-fleet'))}
                className="h-11 px-4 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs sm:text-sm border border-stone-300 shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <FaTv className="w-4 h-4 text-stone-600" />
                <span>Real Fleet Proof</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  window.open(
                    'https://wa.me/918057417617?text=Hi%20AdsWheeler%20team!%20I%20want%20to%20inquire%20about%20Auto%20Rickshaw%20advertising.',
                    '_blank'
                  );
                }}
                className="h-11 px-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FaWhatsapp className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">WhatsApp Enquiry</span>
              </button>
            </div>

            {/* Key Trust Stats Ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-stone-200 text-xs">
              <div>
                <span className="text-[10px] text-stone-400 font-bold uppercase block">Verified Fleet</span>
                <span className="text-base font-black text-stone-900 font-mono">50,000+ Autos</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 font-bold uppercase block">Daily Eyeballs</span>
                <span className="text-base font-black text-teal-700 font-mono">18M+ Views/day</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 font-bold uppercase block">GPS Verification</span>
                <span className="text-base font-black text-emerald-600 font-mono">100% Audited</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 font-bold uppercase block">Pricing Starts</span>
                <span className="text-base font-black text-stone-900 font-mono">₹950 / month</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Preview Collage with Real Digital Screen Auto */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-stone-800 bg-stone-950 group">
              <img
                src="/images/gocab_auto.jpg"
                alt="GO CAB Auto Rickshaw Digital Screen"
                className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-stone-950/85 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-mono font-bold border border-white/20 flex items-center gap-1.5 shadow">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ON-ROAD LIVE • SOUTH DELHI</span>
              </div>

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent p-4 text-white">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold font-display text-emerald-400">High-Nit 22" Digital Display</span>
                  <span className="bg-stone-800 px-2 py-0.5 rounded font-mono text-[10px]">DL 1RN 4821</span>
                </div>
                <p className="text-[11px] text-stone-300 mt-1">
                  Reaching 92,400+ daily commuters in Connaught Place & Nehru Place traffic.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Quick Navigation Strip */}
        <div className="bg-stone-100/90 rounded-2xl border border-stone-200/90 p-2 flex items-center justify-between gap-1 overflow-x-auto shadow-2xs">
          {[
            { id: 'real-fleet', label: 'Real Fleet Proof', icon: 'tv' },
            { id: 'instant-quotation', label: 'Instant Quotation', icon: 'calculator' },
            { id: 'ai-ad-designer', label: 'AI Ad Designer', icon: 'magic-wand' },
            { id: 'advertising-packages', label: 'Ad Packages & Pricing', icon: 'box' },
            { id: 'campaign-dashboard', label: 'Campaign Dashboard', icon: 'chart-pie-alt' },
            { id: 'gps-verification', label: 'GPS Photo Proof', icon: 'camera' },
            { id: 'city-targeting', label: 'City Routes', icon: 'map-marker' },
            { id: 'marketplace', label: 'Live Marketplace', icon: 'shop' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className="px-3 py-2 rounded-xl text-xs font-bold text-stone-700 hover:text-stone-900 hover:bg-white transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Flaticon name={item.icon} style="sr" className="text-xs text-teal-700" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
