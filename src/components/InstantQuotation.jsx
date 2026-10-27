import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Flaticon,
  FaIndianRupeeSign,
  FaLocationDot,
  FaCarSide,
  FaRegEye,
  FaBolt,
  FaWhatsapp,
  FaFileInvoiceDollar,
  FaCheck,
  VerifiedShieldBadge,
  TargetRouteBadge,
  AutoRickshawBadge
} from './RichIcons';

export const CITY_OPTIONS = [
  { id: 'delhi', name: 'Delhi NCR (Gurgaon, Noida, South Delhi)', baseDensity: 1.15, minFleet: 15 },
  { id: 'mumbai', name: 'Mumbai (BKC, Andheri, South Mumbai)', baseDensity: 1.25, minFleet: 20 },
  { id: 'bengaluru', name: 'Bengaluru (Koramangala, Indiranagar, Whitefield)', baseDensity: 1.1, minFleet: 15 },
  { id: 'hyderabad', name: 'Hyderabad (Hitec City, Gachibowli, Banjara Hills)', baseDensity: 1.05, minFleet: 15 },
  { id: 'pune', name: 'Pune (Kothrud, Viman Nagar, Hinjewadi)', baseDensity: 1.0, minFleet: 10 }
];

export const FORMAT_OPTIONS = [
  {
    id: 'DIGITAL_LED',
    title: 'Rear Digital LED Screen',
    subtitle: 'High-Nit 22" commercial digital display (Featured on real fleet)',
    baseRatePerAuto: 4500,
    dailyImpressionsPerAuto: 85000,
    badge: 'HIGHEST IMPACT',
    highlight: true,
    minDurationMonths: 1
  },
  {
    id: 'HOOD_WRAP',
    title: 'Complete 3-Sided Hood Wrap',
    subtitle: 'Weatherproof 3M cast vinyl wrap across top canopy hood',
    baseRatePerAuto: 2800,
    dailyImpressionsPerAuto: 65000,
    badge: 'POPULAR CHOICE',
    highlight: false,
    minDurationMonths: 1
  },
  {
    id: 'BACK_PANEL',
    title: 'Rear Panel Vinyl Sticker',
    subtitle: 'High-visibility rear panel eye-level branding for bumper traffic',
    baseRatePerAuto: 1800,
    dailyImpressionsPerAuto: 52000,
    badge: 'BUDGET FRIENDLY',
    highlight: false,
    minDurationMonths: 1
  },
  {
    id: 'INTERIOR_STRIP',
    title: 'Passenger Interior Strip & QR',
    subtitle: 'Captive passenger eye-level board inside auto cabin (18 min avg ride)',
    baseRatePerAuto: 950,
    dailyImpressionsPerAuto: 22000,
    badge: 'HIGH CONVERSION',
    highlight: false,
    minDurationMonths: 1
  }
];

export const DURATION_OPTIONS = [
  { months: 1, label: '1 Month', discount: 0 },
  { months: 3, label: '3 Months (5% Off)', discount: 0.05 },
  { months: 6, label: '6 Months (12% Off)', discount: 0.12 },
  { months: 12, label: '12 Months (20% Off)', discount: 0.2 }
];

export default function InstantQuotation({ initialConfig = {} }) {
  const [selectedCity, setSelectedCity] = useState(initialConfig.city || CITY_OPTIONS[0]);
  const [fleetCount, setFleetCount] = useState(initialConfig.fleetCount || 50);
  const [selectedFormat, setSelectedFormat] = useState(
    FORMAT_OPTIONS.find((f) => f.id === initialConfig.format) || FORMAT_OPTIONS[0]
  );
  const [selectedDuration, setSelectedDuration] = useState(DURATION_OPTIONS[1]); // default 3 months
  const [brandName, setBrandName] = useState(initialConfig.brandName || '');
  const [contactPhone, setContactPhone] = useState('');
  const [quoteSent, setQuoteSent] = useState(false);

  // Financial & Reach Calculations
  const baseMonthlyCostPerAuto = Math.round(selectedFormat.baseRatePerAuto * selectedCity.baseDensity);
  const rawTotalPerMonth = baseMonthlyCostPerAuto * fleetCount;
  const discountedTotalPerMonth = Math.round(rawTotalPerMonth * (1 - selectedDuration.discount));
  const fullCampaignTotal = discountedTotalPerMonth * selectedDuration.months;

  // Reach Metrics
  const dailyImpressionsTotal = fleetCount * selectedFormat.dailyImpressionsPerAuto;
  const totalCampaignImpressions = dailyImpressionsTotal * 30 * selectedDuration.months;
  const cpm = ((fullCampaignTotal / totalCampaignImpressions) * 1000).toFixed(1);

  // WhatsApp Quotation Generator
  const handleSendWhatsAppQuote = () => {
    const message = encodeURIComponent(
      `*AdsWheeler Instant Quotation Request*\n` +
      `-----------------------------------------\n` +
      `🏢 *Brand*: ${brandName || 'Prospective Brand'}\n` +
      `📍 *Target City*: ${selectedCity.name}\n` +
      `🛺 *Fleet Size*: ${fleetCount} Auto Rickshaws\n` +
      `📺 *Ad Format*: ${selectedFormat.title}\n` +
      `⏱️ *Duration*: ${selectedDuration.label}\n` +
      `💰 *Estimated Budget*: ₹${fullCampaignTotal.toLocaleString('en-IN')}\n` +
      `👀 *Estimated Total Reach*: ${(totalCampaignImpressions / 1000000).toFixed(1)}M Eyeballs (CPM ₹${cpm})\n` +
      `📞 *Contact*: ${contactPhone || 'WhatsApp Chat'}\n` +
      `-----------------------------------------\n` +
      `Please confirm route availability & print schedule!`
    );
    window.open(`https://wa.me/918057417617?text=${message}`, '_blank');
    setQuoteSent(true);
  };

  const handlePrintQuote = () => {
    window.print();
  };

  return (
    <section id="instant-quotation" className="py-8 sm:py-12 bg-white rounded-2xl border border-stone-200 shadow-xs p-4 sm:p-7 my-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 border-b border-stone-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-bold text-teal-800 mb-2">
            <FaFileInvoiceDollar className="w-3.5 h-3.5 text-teal-600" />
            <span>BrandOnAuto Instant Quotation Engine</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-display">
            Calculate Auto Advertising Rates Instantly
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            Choose your target city, fleet quantity, and advertising medium. Get instant transparent pricing, estimated commuter reach, and download your estimate.
          </p>
        </div>

        <button
          onClick={handlePrintQuote}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
        >
          <Flaticon name="document" style="rr" className="text-xs" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Configurator */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. City Selection */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-2 flex items-center gap-1.5">
              <FaLocationDot className="w-3.5 h-3.5 text-teal-600" />
              <span>Step 1: Select Target City & Commuter Corridor</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CITY_OPTIONS.map((city) => {
                const isSelected = selectedCity.id === city.id;
                return (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => setSelectedCity(city)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${isSelected
                        ? 'border-teal-700 bg-teal-50/60 ring-2 ring-teal-600/20'
                        : 'border-stone-200 bg-stone-50 hover:bg-white'
                      }`}
                  >
                    <span className="font-bold text-xs text-stone-900 block">{city.name.split(' (')[0]}</span>
                    <span className="text-[11px] text-stone-500 block truncate">
                      {city.name.includes('(') ? `(${city.name.split('(')[1]}` : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Format Picker */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-2 flex items-center gap-1.5">
              <AutoRickshawBadge size={20} />
              <span>Step 2: Choose Advertising Format</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FORMAT_OPTIONS.map((fmt) => {
                const isSelected = selectedFormat.id === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setSelectedFormat(fmt)}
                    className={`p-3 rounded-xl border text-left transition-all relative cursor-pointer ${isSelected
                        ? 'border-teal-700 bg-teal-50/70 shadow-xs ring-2 ring-teal-600/20'
                        : 'border-stone-200 bg-stone-50 hover:bg-white'
                      }`}
                  >
                    {fmt.badge && (
                      <span className="absolute top-2 right-2 text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-teal-700 text-white">
                        {fmt.badge}
                      </span>
                    )}
                    <span className="font-bold text-xs text-stone-900 block pr-16">{fmt.title}</span>
                    <span className="text-[11px] text-stone-500 block mt-1 leading-snug">{fmt.subtitle}</span>
                    <div className="mt-2 text-xs font-bold text-teal-800 flex items-center gap-1 font-mono">
                      <span>₹{fmt.baseRatePerAuto.toLocaleString('en-IN')}/auto/mo</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Fleet Quantity Slider */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <FaCarSide className="w-3.5 h-3.5 text-teal-600" />
                <span>Step 3: Select Fleet Quantity</span>
              </label>
              <span className="text-sm font-black text-stone-900 font-mono bg-white px-3 py-1 rounded-lg border border-stone-200">
                {fleetCount} Auto Rickshaws
              </span>
            </div>

            <input
              type="range"
              min={10}
              max={300}
              step={10}
              value={fleetCount}
              onChange={(e) => setFleetCount(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer h-2 bg-stone-200 rounded-lg"
            />

            {/* Quick Fleet Presets */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] text-stone-400 font-medium">Quick Presets:</span>
              {[25, 50, 100, 200].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setFleetCount(count)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${fleetCount === count
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                >
                  {count} Autos
                </button>
              ))}
            </div>
          </div>

          {/* 4. Duration Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-2 flex items-center gap-1.5">
              <Flaticon name="calendar" style="rr" className="text-xs text-teal-600" />
              <span>Step 4: Campaign Duration</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DURATION_OPTIONS.map((dur) => {
                const isSelected = selectedDuration.months === dur.months;
                return (
                  <button
                    key={dur.months}
                    type="button"
                    onClick={() => setSelectedDuration(dur)}
                    className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${isSelected
                        ? 'border-teal-700 bg-teal-800 text-white shadow-xs font-bold'
                        : 'border-stone-200 bg-stone-50 hover:bg-white text-stone-800 font-medium text-xs'
                      }`}
                  >
                    <span className="block text-xs">{dur.label.split(' (')[0]}</span>
                    {dur.discount > 0 && (
                      <span className={`text-[10px] block font-bold ${isSelected ? 'text-teal-200' : 'text-emerald-700'}`}>
                        Save {dur.discount * 100}%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Brand Name & Phone for Instant WhatsApp dispatch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Your Brand / Business Name</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Acme Tech, Zomato"
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">WhatsApp Phone Number</label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Quotation Summary Card */}
        <div className="lg:col-span-5">
          <div className="bg-stone-900 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-stone-800 space-y-5 sticky top-20">
            {/* Summary Header */}
            <div className="border-b border-stone-800 pb-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400 font-mono block">
                Official Estimate Breakdown
              </span>
              <h3 className="text-xl font-bold font-display text-white mt-1">
                {selectedFormat.title}
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                {fleetCount} Autos in {selectedCity.name.split(' (')[0]} for {selectedDuration.months} Month(s)
              </p>
            </div>

            {/* Price Calculations */}
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-center justify-between">
                <span>Effective Rate / Auto / Mo:</span>
                <span className="font-mono font-bold text-white">
                  ₹{baseMonthlyCostPerAuto.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Monthly Fleet Investment ({fleetCount} Autos):</span>
                <span className="font-mono font-bold text-white">
                  ₹{rawTotalPerMonth.toLocaleString('en-IN')}
                </span>
              </div>
              {selectedDuration.discount > 0 && (
                <div className="flex items-center justify-between text-emerald-400">
                  <span>Duration Discount ({selectedDuration.discount * 100}%):</span>
                  <span className="font-mono font-bold">
                    -₹{Math.round(rawTotalPerMonth * selectedDuration.discount).toLocaleString('en-IN')}/mo
                  </span>
                </div>
              )}
              <div className="border-t border-stone-800 pt-3 flex items-center justify-between text-sm sm:text-base">
                <span className="font-bold text-white">Total Campaign Budget:</span>
                <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                  ₹{fullCampaignTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Estimated Reach & Performance */}
            <div className="bg-stone-800/80 rounded-xl p-3.5 border border-stone-700 space-y-2">
              <div className="text-[11px] font-bold text-teal-300 uppercase tracking-wide">
                Commuter Reach Projections
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 block">Daily Street Views</span>
                  <span className="font-extrabold text-white font-mono text-sm">
                    {(dailyImpressionsTotal / 100000).toFixed(2)} Lakh/day
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Total Eyeballs</span>
                  <span className="font-extrabold text-white font-mono text-sm">
                    {(totalCampaignImpressions / 1000000).toFixed(1)} Million
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Effective CPM</span>
                  <span className="font-extrabold text-emerald-400 font-mono text-sm">
                    ₹{cpm} <span className="text-[9px] text-stone-400">(vs ₹160 Hoardings)</span>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">GPS Photo Audit</span>
                  <span className="font-extrabold text-white font-mono text-xs flex items-center gap-1 text-emerald-400">
                    <FaCheck className="w-3 h-3" /> Included
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleSendWhatsAppQuote}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-98"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>Get This Official Quotation on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handlePrintQuote}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Flaticon name="download" style="rr" className="text-xs" />
                <span>Download Print-Ready Estimate Summary</span>
              </button>
            </div>

            {quoteSent && (
              <p className="text-xs text-emerald-400 text-center font-medium">
                ✓ WhatsApp request launched! A campaign specialist will connect within 15 minutes.
              </p>
            )}

            {/* Inclusions list */}
            <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400 space-y-1">
              <div className="flex items-center gap-1.5">
                <VerifiedShieldBadge size={16} />
                <span>Includes High-Res Printing, Hub Mounting & Maintenance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <TargetRouteBadge size={16} />
                <span>Dedicated Transit Corridors with Geo-Location Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
