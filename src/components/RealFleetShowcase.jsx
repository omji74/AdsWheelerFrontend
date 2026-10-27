import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flaticon,
  FaTv,
  FaShieldHalved,
  FaLocationDot,
  FaRegEye,
  FaBolt,
  FaArrowRight,
  FaWhatsapp,
  VerifiedShieldBadge,
  TargetRouteBadge
} from './RichIcons';

export const REAL_FLEET_DATA = [
  {
    id: 'gocab',
    brand: 'GO CAB Mobility',
    campaignTitle: 'Book a Ride • Get 50% Off App Launch',
    category: 'Cab & Ride Hailing',
    image: '/images/gocab_auto.jpg',
    city: 'Delhi NCR (South Ex & Connaught Place)',
    coordinates: '28.5672° N, 77.2100° E',
    vehicleNo: 'DL 1RN 4821',
    format: 'High-Nit Rear Digital LED Screen',
    dailyImpressions: '92,400+ views/day',
    activeHours: '6:00 AM – 11:30 PM (17.5 hrs)',
    tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    description:
      'High-contrast digital transit display capturing commuters stuck in evening peak traffic behind the auto.'
  },
  {
    id: 'fastbites',
    brand: 'FAST BITES Online',
    campaignTitle: 'Order Food Online • Flat 50% Off First Feast',
    category: 'Food Delivery & QSR',
    image: '/images/fastbites_auto.jpg',
    city: 'Mumbai (Andheri West & Bandra BKC)',
    coordinates: '19.1136° N, 72.8697° E',
    vehicleNo: 'MH 02 EQ 8814',
    format: 'High-Nit Rear Digital LED Screen',
    dailyImpressions: '98,600+ views/day',
    activeHours: '7:00 AM – 12:00 Midnight (17 hrs)',
    tagColor: 'bg-orange-50 text-orange-800 border-orange-200',
    description:
      'Vivid visual of food delivery app targeted at corporate foodies across commercial transit corridors.'
  },
  {
    id: 'shopy',
    brand: 'SHOPY E-Commerce',
    campaignTitle: 'Grand Festive Sale • Up to 50% Off Gifts',
    category: 'Retail & Festive E-Commerce',
    image: '/images/shopy_auto.jpg',
    city: 'Bengaluru (Indiranagar & Koramangala)',
    coordinates: '12.9716° N, 77.5946° E',
    vehicleNo: 'KA 03 AA 9120',
    format: 'High-Nit Rear Digital LED Screen',
    dailyImpressions: '88,900+ views/day',
    activeHours: '6:30 AM – 11:00 PM (16.5 hrs)',
    tagColor: 'bg-amber-50 text-amber-800 border-amber-200',
    description:
      'Festive shopping creative driving instant mobile app installs via high eye-level visibility.'
  },
  {
    id: 'admissions',
    brand: 'GLOBAL SCHOLARS ACADEMY',
    campaignTitle: 'Admissions Open 2026-2027 • KG to Post-Graduate',
    category: 'Education & Admissions',
    image: '/images/admissions_auto.jpg',
    city: 'Pune & Hyderabad (University Ring Road)',
    coordinates: '18.5204° N, 73.8567° E',
    vehicleNo: 'MH 12 QP 3390',
    format: 'High-Nit Rear Digital LED Screen',
    dailyImpressions: '84,200+ views/day',
    activeHours: '7:00 AM – 10:30 PM (15.5 hrs)',
    tagColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    description:
      'High-recall institution admission campaign reaching parents and students during morning school/college commutes.'
  }
];

export default function RealFleetShowcase({ onInstantQuote, onOpenAiDesigner }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeItem = REAL_FLEET_DATA[selectedIdx];

  const handleWhatsAppEnquiry = (brandName) => {
    const text = encodeURIComponent(
      `Hello AdsWheeler! I saw the real auto-rickshaw digital screen campaign for "${brandName}" and would like to get a pricing quote for my brand.`
    );
    window.open(`https://wa.me/918057417617?text=${text}`, '_blank');
  };

  return (
    <section className="py-8 sm:py-12 bg-white rounded-2xl border border-stone-200 shadow-xs p-4 sm:p-7 my-8">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 sm:mb-8 border-b border-stone-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-bold text-teal-800 mb-2">
            <FaTv className="w-3.5 h-3.5 text-teal-600" />
            <span>Real Fleet In Action • BrandOnAuto Verified Proof</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-display">
            Live On Indian Roads: Rear Digital LED Displays
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            See actual verified Bajaj RE CNG auto-rickshaws running our client campaigns. Eye-level positioning guarantees unmissable visibility in bumper-to-bumper city traffic.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={onOpenAiDesigner}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
          >
            <Flaticon name="magic-wand" style="sr" className="text-sm text-amber-400" />
            <span>Design Your Ad on Auto</span>
          </button>
          <button
            onClick={onInstantQuote}
            className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
          >
            <Flaticon name="calculator" style="sr" className="text-sm text-white" />
            <span>Instant Quote</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left: Real Auto Image Viewport with Geotag Overlay */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full max-w-lg rounded-2xl overflow-hidden bg-stone-900 border-2 border-stone-800 shadow-xl group">
            {/* Live Status Pill */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/85 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE ON-ROAD DEPLOYMENT</span>
            </div>

            {/* GPS Watermark Badge */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-[10px] font-mono font-semibold shadow">
              <VerifiedShieldBadge size={16} />
              <span>GPS AUDITED</span>
            </div>

            {/* Real Photo */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="relative aspect-[3/4] w-full bg-stone-950 flex items-center justify-center overflow-hidden"
              >
                <img
                  src={activeItem.image}
                  alt={activeItem.campaignTitle}
                  className="w-full h-full object-cover object-center select-none"
                  loading="eager"
                />

                {/* Bottom Photo Metadata HUD Overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent p-4 pt-10 text-white">
                  <div className="flex items-center justify-between text-xs font-mono text-stone-300">
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <FaLocationDot className="w-3.5 h-3.5" />
                      {activeItem.city}
                    </span>
                    <span className="bg-stone-800/90 px-2 py-0.5 rounded text-[11px] border border-stone-700">
                      {activeItem.vehicleNo}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-400 mt-1 font-mono">
                    Coord: {activeItem.coordinates} • Timestamp: Verified Live
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thumbnail Selector Bar */}
          <div className="grid grid-cols-4 gap-2 w-full max-w-lg mt-3">
            {REAL_FLEET_DATA.map((item, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer aspect-[3/4] ${isSelected
                      ? 'border-teal-600 ring-2 ring-teal-500/30 scale-102 shadow-md'
                      : 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
                    }`}
                >
                  <img
                    src={item.image}
                    alt={item.brand}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-stone-950/80 p-1 text-center">
                    <span className="text-[9px] font-bold text-white block truncate">
                      {item.brand.split(' ')[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Campaign Specifications & Route Intel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${activeItem.tagColor}`}>
                {activeItem.category}
              </span>
              <span className="text-xs font-bold text-teal-700 font-mono">
                {activeItem.format}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-stone-900 font-display">
                {activeItem.brand}
              </h3>
              <p className="text-xs font-semibold text-stone-700 mt-0.5">
                {activeItem.campaignTitle}
              </p>
              <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                {activeItem.description}
              </p>
            </div>

            {/* Campaign Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-200 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-stone-200/70">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Daily Footfall</span>
                <span className="text-sm font-extrabold text-stone-900 font-mono flex items-center gap-1 mt-0.5">
                  <FaRegEye className="w-3.5 h-3.5 text-teal-600" />
                  {activeItem.dailyImpressions}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-stone-200/70">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Operating Window</span>
                <span className="text-xs font-bold text-stone-800 font-mono flex items-center gap-1 mt-1">
                  <FaBolt className="w-3 h-3 text-amber-500" />
                  {activeItem.activeHours}
                </span>
              </div>
            </div>

            {/* Route & Vehicle Technical Specs */}
            <div className="bg-white p-3 rounded-lg border border-stone-200/70 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Verified Auto Plate:</span>
                <span className="font-mono font-bold text-stone-800 bg-stone-100 px-2 py-0.5 rounded">
                  {activeItem.vehicleNo}
                </span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">GPS Geotag:</span>
                <span className="font-mono text-[11px] text-teal-800 font-semibold">
                  {activeItem.coordinates}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500 font-medium">Display Hardware:</span>
                <span className="font-semibold text-stone-800">
                  22" Commercial LED (2500 Nits)
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2">
            <button
              onClick={() => handleWhatsAppEnquiry(activeItem.brand)}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>Enquire About {activeItem.brand.split(' ')[0]} Format on WhatsApp</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onOpenAiDesigner}
                className="py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Flaticon name="edit" style="rr" className="text-xs" />
                <span>Simulate Your Ad</span>
              </button>
              <button
                onClick={onInstantQuote}
                className="py-2.5 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Calculate Rate</span>
                <FaArrowRight className="w-3 h-3 text-teal-700" />
              </button>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2.5">
            <VerifiedShieldBadge size={22} className="shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">100% On-Road Proof Guarantee</span>
              <span>Every auto deployment includes geotagged time-stamped inspection photos uploaded to your campaign dashboard.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
