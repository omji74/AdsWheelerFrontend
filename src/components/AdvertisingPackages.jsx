import React from 'react';
import {
  Flaticon,
  FaTv,
  FaCheck,
  FaIndianRupeeSign,
  FaArrowRight,
  FaWhatsapp,
  VerifiedShieldBadge,
  AutoRickshawBadge
} from './RichIcons';

export const PACKAGES_DATA = [
  {
    id: 'digital-screen',
    name: 'Rear Digital LED Screen',
    tag: 'MOST POPULAR • HIGH IMPACT',
    highlight: true,
    pricePerMonth: 4500,
    priceSubtext: 'per auto / month',
    image: '/images/gocab_auto.jpg',
    description:
      'High-nit 22-inch commercial LED screen mounted on the rear canopy of Bajaj Auto Rickshaws. Dynamic digital rotation with 100% day & night contrast.',
    features: [
      '22" High-Nit LED Display (2500 Nits)',
      '100% Day & Night Visibility',
      'Rotate up to 4 video/image creatives',
      'Real-time GPS Telemetry & Impress-counter',
      'Min fleet: 15 Auto Rickshaws',
      'Daily Reach: ~85,000+ views/auto'
    ]
  },
  {
    id: 'hood-wrap',
    name: 'Complete 3-Sided Hood Wrap',
    tag: '360° STREET VISIBILITY',
    highlight: false,
    pricePerMonth: 2800,
    priceSubtext: 'per auto / month',
    image: '/images/fastbites_auto.jpg',
    description:
      'Full exterior canopy coverage covering rear and side panels in premium outdoor weatherproof 3M cast vinyl with anti-fade UV laminate.',
    features: [
      'Top Hood + Left & Right Canopy Panels',
      '3M Cast Vinyl with Matte/Gloss UV Laminate',
      '360° street & pedestrian visibility',
      'High durability in rain & Indian sun',
      'Min fleet: 25 Auto Rickshaws',
      'Daily Reach: ~65,000+ views/auto'
    ]
  },
  {
    id: 'back-panel',
    name: 'Rear Panel Vinyl Billboard',
    tag: 'COST-EFFECTIVE CLASSIC',
    highlight: false,
    pricePerMonth: 1800,
    priceSubtext: 'per auto / month',
    image: '/images/shopy_auto.jpg',
    description:
      'Direct rear hood eye-level panel sticker targeting vehicles and commuters trapped behind the auto in peak Indian traffic.',
    features: [
      'Rear Panel Vinyl (Size 28" x 14")',
      'Targeted for bumper-to-bumper car drivers',
      'High-resolution 1200 DPI solvent print',
      'GPS installation proof photos',
      'Min fleet: 25 Auto Rickshaws',
      'Daily Reach: ~52,000+ views/auto'
    ]
  },
  {
    id: 'interior-strip',
    name: 'Passenger Interior Strip & QR',
    tag: 'CAPTIVE CONVERSIONS',
    highlight: false,
    pricePerMonth: 950,
    priceSubtext: 'per auto / month',
    image: '/images/admissions_auto.jpg',
    description:
      'Direct line-of-sight eye level panel on driver partition directly facing riders inside the auto. Perfect for app downloads and instant lead capture.',
    features: [
      'Inside Cabin Partition (Eye-Level to Passenger)',
      '18-minute average captive dwell time',
      'Custom QR Code for direct app installs / leads',
      'Zero street clutter distraction',
      'Min fleet: 50 Auto Rickshaws',
      'Daily Reach: ~22,000 riders/auto'
    ]
  }
];

export default function AdvertisingPackages({ onSelectPackage }) {
  const handleWhatsAppEnquiry = (packageName) => {
    const text = encodeURIComponent(
      `Hello AdsWheeler! I'm interested in the "${packageName}" advertising package for Auto Rickshaws. Please share availability and current discounts.`
    );
    window.open(`https://wa.me/918057417617?text=${text}`, '_blank');
  };

  return (
    <section id="advertising-packages" className="py-8 sm:py-12 bg-white rounded-2xl border border-stone-200 shadow-xs p-4 sm:p-7 my-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-bold text-teal-800 mb-2">
          <AutoRickshawBadge size={18} />
          <span>Transparent Fleet Packages • No Hidden Charges</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-display">
          Auto Rickshaw Advertising Packages
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1.5">
          Select from dynamic digital LED screens, complete vinyl canopy wraps, or high-conversion passenger interior strips. Every package includes printing, installation, and GPS verification.
        </p>
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {PACKAGES_DATA.map((pkg) => {
          return (
            <div
              key={pkg.id}
              className={`rounded-2xl border flex flex-col justify-between transition-all duration-200 overflow-hidden relative shadow-xs ${pkg.highlight
                  ? 'border-teal-700 bg-teal-50/20 ring-2 ring-teal-600/30'
                  : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
            >
              {/* Highlight Tag */}
              {pkg.tag && (
                <div
                  className={`text-[9px] font-extrabold px-3 py-1 text-center uppercase tracking-wider ${pkg.highlight ? 'bg-teal-700 text-white' : 'bg-stone-100 text-stone-700'
                    }`}
                >
                  {pkg.tag}
                </div>
              )}

              {/* Photo Preview Thumbnail */}
              <div className="aspect-[16/10] bg-stone-900 overflow-hidden relative">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-[10px] text-white font-mono">
                  Real Fleet Photo
                </div>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-sm font-extrabold text-stone-900 font-display">
                    {pkg.name}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-black text-stone-900 font-mono">
                      ₹{pkg.pricePerMonth.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      /{pkg.priceSubtext}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-2 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="pt-3 border-t border-stone-100 space-y-2 text-xs">
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-stone-700">
                      <FaCheck className="w-3 h-3 text-teal-700 shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-2 space-y-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectPackage) onSelectPackage(pkg.id);
                    }}
                    className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${pkg.highlight
                        ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-xs'
                        : 'bg-stone-900 hover:bg-stone-800 text-white'
                      }`}
                  >
                    <span>Configure in Instant Quote</span>
                    <FaArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppEnquiry(pkg.name)}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-[11px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FaWhatsapp className="w-3.5 h-3.5" />
                    <span>WhatsApp Enquiry</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Table */}
      <div className="mt-10 overflow-x-auto">
        <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
          Detailed Feature Comparison Matrix
        </h4>
        <table className="w-full text-xs text-left border border-stone-200 rounded-xl overflow-hidden">
          <thead className="bg-stone-100 text-stone-700 font-bold">
            <tr>
              <th className="p-3 border-b border-stone-200">Specification</th>
              <th className="p-3 border-b border-stone-200">Digital LED Screen</th>
              <th className="p-3 border-b border-stone-200">Hood Wrap (Vinyl)</th>
              <th className="p-3 border-b border-stone-200">Rear Panel Sticker</th>
              <th className="p-3 border-b border-stone-200">Interior Strip</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-stone-700">
            <tr>
              <td className="p-3 font-semibold text-stone-900">Night Visibility</td>
              <td className="p-3 font-bold text-emerald-700">100% Backlit LED (2500 Nits)</td>
              <td className="p-3">Reflective in Headlights</td>
              <td className="p-3">Reflective in Headlights</td>
              <td className="p-3">Cabin Bulb Lit</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-stone-900">Creative Updates</td>
              <td className="p-3 font-bold text-emerald-700">Instant Over-The-Air (OTA)</td>
              <td className="p-3">Requires Reprinting</td>
              <td className="p-3">Requires Reprinting</td>
              <td className="p-3">Requires Reprinting</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-stone-900">Minimum Fleet</td>
              <td className="p-3 font-mono">15 Autos</td>
              <td className="p-3 font-mono">25 Autos</td>
              <td className="p-3 font-mono">25 Autos</td>
              <td className="p-3 font-mono">50 Autos</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-stone-900">GPS Photo Verification</td>
              <td className="p-3 text-emerald-700 font-bold">✓ Included</td>
              <td className="p-3 text-emerald-700 font-bold">✓ Included</td>
              <td className="p-3 text-emerald-700 font-bold">✓ Included</td>
              <td className="p-3 text-emerald-700 font-bold">✓ Included</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
