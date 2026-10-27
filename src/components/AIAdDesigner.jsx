import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Flaticon,
  FaTv,
  FaWandMagicSparkles,
  FaArrowRight,
  FaWhatsapp,
  FaDownload,
  FaSliders,
  FaBolt,
  AutoRickshawBadge
} from './RichIcons';

const INDUSTRY_PRESETS = [
  {
    id: 'food',
    name: 'Food & Dining',
    brand: 'FAST BITES',
    headline: 'ORDER FOOD ONLINE',
    subtext: 'GET 50% OFF ON YOUR FIRST ORDER',
    cta: 'ORDER ON APP',
    theme: 'from-amber-500 via-orange-600 to-red-700',
    accentColor: '#F59E0B',
    sampleIcon: 'utensils'
  },
  {
    id: 'mobility',
    name: 'Cab & Travel',
    brand: 'GO CAB',
    headline: 'BOOK A RIDE IN 2 MINS',
    subtext: 'FLAT 50% OFF • SAFE CITY COMMUTES',
    cta: 'DOWNLOAD APP',
    theme: 'from-blue-600 via-indigo-700 to-purple-900',
    accentColor: '#38BDF8',
    sampleIcon: 'car'
  },
  {
    id: 'retail',
    name: 'Retail & Sale',
    brand: 'SHOPY MEGA',
    headline: 'GRAND FESTIVE SALE',
    subtext: 'UP TO 70% OFF ELECTRONICS & FASHION',
    cta: 'SHOP NOW',
    theme: 'from-amber-600 via-yellow-500 to-orange-600',
    accentColor: '#FEF08A',
    sampleIcon: 'shopping-bag'
  },
  {
    id: 'education',
    name: 'Education & EdTech',
    brand: 'OXFORD GLOBAL ACADEMY',
    headline: 'ADMISSIONS OPEN 2026',
    subtext: 'KG TO GRADE 12 • WORLD CLASS LABS',
    cta: 'CALL 1800-000-789',
    theme: 'from-sky-700 via-blue-800 to-indigo-950',
    accentColor: '#93C5FD',
    sampleIcon: 'graduation-cap'
  },
  {
    id: 'health',
    name: 'Health & Diagnostics',
    brand: 'APOLLO HEALTH CHECK',
    headline: 'FULL BODY HEALTH CHECKUP',
    subtext: '65+ TESTS AT ₹499 ONLY • FREE HOME SAMPLE',
    cta: 'BOOK TEST TODAY',
    theme: 'from-emerald-600 via-teal-700 to-cyan-900',
    accentColor: '#6EE7B7',
    sampleIcon: 'heart-pulse'
  }
];

const AI_SLOGAN_IDEAS = [
  { headline: 'CRAVING MIDNIGHT BIRYANI?', subtext: 'Delivering Fresh & Hot in 15 Minutes' },
  { headline: 'TIRED OF TRAFFIC JAMS?', subtext: 'Metro Shuttle Cabs Starting at ₹29' },
  { headline: 'ZERO BROKERAGE HOMES', subtext: 'Verified 1BHK & 2BHK Near Metro Stations' },
  { headline: 'BECOME A FULL STACK DEV', subtext: '100% Placement Guarantee • Batches Starting' },
  { headline: 'UP TO ₹5 LAKH INSTANT LOAN', subtext: 'Disbursal in 5 Mins • Zero Paperwork' }
];

export default function AIAdDesigner({ onApplyToQuotation }) {
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRY_PRESETS[0]);
  const [brandName, setBrandName] = useState(INDUSTRY_PRESETS[0].brand);
  const [headline, setHeadline] = useState(INDUSTRY_PRESETS[0].headline);
  const [subtext, setSubtext] = useState(INDUSTRY_PRESETS[0].subtext);
  const [ctaText, setCtaText] = useState(INDUSTRY_PRESETS[0].cta);
  const [gradientTheme, setGradientTheme] = useState(INDUSTRY_PRESETS[0].theme);
  const [showQrCode, setShowQrCode] = useState(true);
  const [showPhoneBadge, setShowPhoneBadge] = useState(true);
  const [viewMode, setViewMode] = useState('REAR_SCREEN'); // 'REAR_SCREEN' | 'FULL_WRAP'

  const handleApplyPreset = (preset) => {
    setSelectedIndustry(preset);
    setBrandName(preset.brand);
    setHeadline(preset.headline);
    setSubtext(preset.subtext);
    setCtaText(preset.cta);
    setGradientTheme(preset.theme);
  };

  const handleGenerateAiIdeas = () => {
    const random = AI_SLOGAN_IDEAS[Math.floor(Math.random() * AI_SLOGAN_IDEAS.length)];
    setHeadline(random.headline);
    setSubtext(random.subtext);
  };

  const handleWhatsAppBooking = () => {
    const text = encodeURIComponent(
      `Hello AdsWheeler! I designed my Auto Ad on your AI Designer:\n- Brand: ${brandName}\n- Headline: "${headline}"\n- Offer: "${subtext}"\n- Format: Rear Digital LED Screen.\n\nPlease share fleet availability and quotation!`
    );
    window.open(`https://wa.me/918057417617?text=${text}`, '_blank');
  };

  return (
    <section id="ai-ad-designer" className="py-8 sm:py-12 bg-white rounded-2xl border border-stone-200 shadow-xs p-4 sm:p-7 my-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 border-b border-stone-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-purple-800 mb-2">
            <FaWandMagicSparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>AI Ad Designer Studio • Real-Time Mockup</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-display">
            Design Your Brand Ad on Auto Rickshaws
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            Test headlines, offers, and color combinations. See exactly how your advertisement will appear to commuters driving behind Bajaj Auto Rickshaws.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGenerateAiIdeas}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
        >
          <FaWandMagicSparkles className="w-3.5 h-3.5" />
          <span>AI Slogan Generator</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Creative Editor Controls */}
        <div className="lg:col-span-5 space-y-4">
          {/* Industry Preset Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              Select Industry Template
            </label>
            <div className="flex flex-wrap gap-1.5">
              {INDUSTRY_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${selectedIndustry.id === preset.id
                      ? 'bg-purple-700 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Brand Name
              </label>
              <input
                type="text"
                value={brandName}
                maxLength={26}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. ZOMATO, TATA MOTORS"
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Punchy Headline
              </label>
              <input
                type="text"
                value={headline}
                maxLength={36}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. ORDER FOOD ONLINE"
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Subtext / Special Offer
              </label>
              <input
                type="text"
                value={subtext}
                maxLength={48}
                onChange={(e) => setSubtext(e.target.value)}
                placeholder="e.g. FLAT 50% OFF ON FIRST PURCHASE"
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Call to Action Button Text
              </label>
              <input
                type="text"
                value={ctaText}
                maxLength={22}
                onChange={(e) => setCtaText(e.target.value)}
                placeholder="e.g. DOWNLOAD THE APP NOW"
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600"
              />
            </div>

            {/* Color Palette Gradients */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Display Screen Background Theme
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { name: 'Neon Dark', theme: 'from-stone-950 via-purple-950 to-blue-950' },
                  { name: 'Warm Amber', theme: 'from-amber-600 via-orange-600 to-red-700' },
                  { name: 'Royal Indigo', theme: 'from-blue-700 via-indigo-800 to-purple-950' },
                  { name: 'Emerald Fresh', theme: 'from-emerald-700 via-teal-800 to-cyan-950' }
                ].map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setGradientTheme(item.theme)}
                    className={`h-7 rounded-lg bg-gradient-to-r ${item.theme} border transition-all cursor-pointer ${gradientTheme === item.theme
                        ? 'ring-2 ring-purple-600 ring-offset-2 border-white scale-102'
                        : 'border-stone-300 opacity-80 hover:opacity-100'
                      }`}
                    title={item.name}
                  />
                ))}
              </div>
            </div>

            {/* Badges Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showQrCode}
                  onChange={(e) => setShowQrCode(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
                <span className="font-medium text-stone-700">Show App QR Code</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPhoneBadge}
                  onChange={(e) => setShowPhoneBadge(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
                <span className="font-medium text-stone-700">Show Store Badges</span>
              </label>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleWhatsAppBooking}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>Send This Ad to AdsWheeler on WhatsApp</span>
            </button>

            {onApplyToQuotation && (
              <button
                type="button"
                onClick={() => onApplyToQuotation({ brandName, headline })}
                className="w-full py-2.5 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Calculate Fleet Rate with This Ad</span>
                <FaArrowRight className="w-3 h-3 text-purple-700" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Realistic Rickshaw Rear Digital Screen Mockup */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-lg bg-stone-100 rounded-2xl border-2 border-stone-300 p-4 sm:p-6 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-3 text-xs">
              <span className="font-bold text-stone-800 flex items-center gap-1.5">
                <AutoRickshawBadge size={20} />
                <span>Bajaj RE CNG • Rear Digital LED Display</span>
              </span>
              <span className="bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                2500 NITS HIGH-NIT
              </span>
            </div>

            {/* Auto Rickshaw Rear Illustration Structure with Embedded LED Screen */}
            <div className="relative w-full aspect-[4/5] bg-[#E5E3D8] rounded-xl overflow-hidden border border-stone-400/80 shadow-inner flex flex-col items-center justify-between p-3 sm:p-5 select-none">
              {/* Yellow Canopy Top */}
              <div className="w-full h-14 bg-gradient-to-b from-[#F59E0B] to-[#D97706] rounded-t-2xl border-b-4 border-stone-800 shadow-md relative flex items-center justify-center">
                <span className="text-[11px] font-extrabold tracking-widest text-stone-900 font-mono opacity-80">
                  BAJAJ AUTO CNG
                </span>
                <div className="absolute top-2 left-4 w-3 h-3 rounded-full bg-stone-900/40" />
                <div className="absolute top-2 right-4 w-3 h-3 rounded-full bg-stone-900/40" />
              </div>

              {/* The Central High-Definition Digital LED Screen Bezel */}
              <div className="w-full my-auto p-2.5 sm:p-3.5 bg-stone-950 rounded-xl border-4 border-stone-800 shadow-2xl relative">
                {/* Metallic Bezel Screws */}
                <div className="absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-stone-400" />
                <div className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-stone-400" />
                <div className="absolute bottom-1 left-2 w-1.5 h-1.5 rounded-full bg-stone-400" />
                <div className="absolute bottom-1 right-2 w-1.5 h-1.5 rounded-full bg-stone-400" />

                {/* The Active Digital Screen Display Canvas */}
                <div
                  className={`w-full aspect-[16/10] bg-gradient-to-br ${gradientTheme} rounded-lg p-3 sm:p-4 text-white flex flex-col justify-between relative overflow-hidden shadow-inner border border-white/20`}
                >
                  {/* Subtle LED Matrix Glow Grid */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                      backgroundSize: '8px 8px'
                    }}
                  />

                  {/* Brand Top Header */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-white text-stone-900 flex items-center justify-center font-black text-xs shadow-sm">
                        {brandName.substring(0, 1)}
                      </div>
                      <span className="text-xs sm:text-sm font-black tracking-wider uppercase font-display drop-shadow">
                        {brandName}
                      </span>
                    </div>

                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-yellow-300">
                      EXCLUSIVE OFFER
                    </span>
                  </div>

                  {/* Creative Center Copy */}
                  <div className="relative z-10 my-auto text-center py-1">
                    <h4 className="text-base sm:text-2xl font-black tracking-tight leading-tight uppercase font-display drop-shadow-md text-white">
                      {headline}
                    </h4>
                    <p className="text-[11px] sm:text-xs font-bold text-yellow-300 mt-1 uppercase tracking-wide drop-shadow">
                      {subtext}
                    </p>
                  </div>

                  {/* Bottom Action Footer with Badges */}
                  <div className="relative z-10 pt-2 border-t border-white/20 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {showQrCode && (
                        <div className="w-7 h-7 bg-white p-0.5 rounded shadow-sm shrink-0 flex items-center justify-center">
                          <Flaticon name="qr-code" style="sr" className="text-stone-900 text-base" />
                        </div>
                      )}
                      <div className="text-left">
                        <span className="text-[9px] text-white/80 block leading-tight font-medium">
                          Scan with Phone
                        </span>
                        <span className="text-[10px] font-black text-white block leading-tight">
                          Instant Discount
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="px-3 py-1 rounded bg-yellow-400 text-stone-950 font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-sm">
                        {ctaText}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lower Green Body & Auto Rickshaw Tail Lights */}
              <div className="w-full bg-[#059669] rounded-b-xl border-t-4 border-[#047857] p-2.5 sm:p-3 text-white flex items-center justify-between shadow-md">
                {/* Left Tail Lamp */}
                <div className="w-4 sm:w-5 h-8 bg-gradient-to-b from-red-600 via-amber-400 to-red-600 rounded border border-red-800 shadow-sm" />

                {/* License Plate & CNG Badge */}
                <div className="flex flex-col items-center">
                  <div className="bg-yellow-300 border-2 border-stone-900 px-3 py-0.5 rounded font-mono font-bold text-stone-900 text-xs shadow-xs">
                    DL 1RN 4821
                  </div>
                  <span className="text-[9px] font-bold text-emerald-100 tracking-wider mt-0.5">
                    VERIFIED CNG AUTO
                  </span>
                </div>

                {/* Right Tail Lamp */}
                <div className="w-4 sm:w-5 h-8 bg-gradient-to-b from-red-600 via-amber-400 to-red-600 rounded border border-red-800 shadow-sm" />
              </div>
            </div>

            {/* Commuter View Angle Note */}
            <p className="text-[11px] text-stone-500 text-center mt-3">
              👀 This is the direct line of sight for car drivers, bikers, and bus commuters in city traffic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
