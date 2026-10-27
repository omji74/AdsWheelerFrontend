import React, { useState } from 'react';
import {
  Flaticon,
  FaLocationDot,
  FaCarSide,
  FaRegEye,
  FaArrowRight,
  FaWhatsapp,
  TargetRouteBadge,
  VerifiedShieldBadge
} from './RichIcons';

export const CITIES_DATA = [
  {
    id: 'delhi-ncr',
    name: 'Delhi NCR Transit Network',
    state: 'Delhi, Gurgaon & Noida',
    activeFleet: '14,200+ Verified Autos',
    dailyImpressions: '11.8 Million',
    startingRate: '₹1,800/mo',
    overview:
      'India’s largest transit market connecting corporate corridors, Delhi University campus zones, and metro transfer nodes.',
    corridors: [
      {
        name: 'Cyber City & Golf Course Road (Gurgaon)',
        density: 'Corporate Tech Executives & Consultants',
        routes: ['Sikanderpur Metro ⇄ DLF Cyber City ⇄ One Horizon Center'],
        views: '95,000 views/auto/day'
      },
      {
        name: 'Connaught Place & Central Corridors',
        density: 'Retail Shoppers, Govt Officers & Tourists',
        routes: ['CP Radial Roads ⇄ Barakhamba ⇄ Mandi House ⇄ ITO'],
        views: '92,000 views/auto/day'
      },
      {
        name: 'Noida Sector 18 & Electronic City Sector 62',
        density: 'IT Parks, Media Houses & Commercial Malls',
        routes: ['Botanical Garden Metro ⇄ Sector 18 Mall Hub ⇄ Sector 62'],
        views: '88,000 views/auto/day'
      }
    ]
  },
  {
    id: 'mumbai',
    name: 'Mumbai Suburban Fleet',
    state: 'Mumbai Western & Central Suburbs',
    activeFleet: '18,500+ Verified Autos',
    dailyImpressions: '16.4 Million',
    startingRate: '₹2,200/mo',
    overview:
      'Unrivaled commuter density. Bumper-to-bumper traffic along Western Express Highway guarantees prolonged eye-level dwell time.',
    corridors: [
      {
        name: 'Bandra-Kurla Complex (BKC) Express',
        density: 'BFSI Bankers, FinTech & Corporate HQ Staff',
        routes: ['Bandra Station ⇄ BKC Diamond Bourse ⇄ Kurla West'],
        views: '105,000 views/auto/day'
      },
      {
        name: 'Andheri West & Lokhandwala Media Hub',
        density: 'Media Professionals, Shoppers & Youth',
        routes: ['Andheri Station ⇄ Infinity Mall ⇄ Versova Beach'],
        views: '98,000 views/auto/day'
      },
      {
        name: 'Powai Hiranandani & Kanjurmarg Tech Link',
        density: 'IIT Techies, Startups & Affluent Residents',
        routes: ['Kanjurmarg Station ⇄ Hiranandani Gardens ⇄ JVLR'],
        views: '84,000 views/auto/day'
      }
    ]
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru Tech Corridors',
    state: 'Bengaluru Urban & Tech Corridors',
    activeFleet: '11,400+ Verified Autos',
    dailyImpressions: '9.5 Million',
    startingRate: '₹1,900/mo',
    overview:
      'High-converting audience of software engineers, founders, and students navigating Silicon Valley of India.',
    corridors: [
      {
        name: 'Koramangala ⇄ Indiranagar 100ft Spine',
        density: 'Venture Capitalists, Techies & F&B Diners',
        routes: ['Sony World Signal ⇄ Domlur Flyover ⇄ 100ft Road'],
        views: '86,000 views/auto/day'
      },
      {
        name: 'Whitefield ITPL & Outer Ring Road (ORR)',
        density: 'MNC Tech Campuses & Commuter Shuttles',
        routes: ['Marathahalli Bridge ⇄ Bellandur EcoSpace ⇄ Kadubeesanahalli'],
        views: '89,000 views/auto/day'
      },
      {
        name: 'HSR Layout & Electronic City Phase 1',
        density: 'Startup Hubs, Co-working Spaces & Colleges',
        routes: ['Silk Board Junction ⇄ HSR 27th Main ⇄ E-City Toll'],
        views: '78,000 views/auto/day'
      }
    ]
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad Cyberabad Transit',
    state: 'Cyberabad & Hyderabad Metro',
    activeFleet: '8,800+ Verified Autos',
    dailyImpressions: '7.2 Million',
    startingRate: '₹1,750/mo',
    overview:
      'Dynamic transit network spanning Hitec City, financial district towers, and university junctions.',
    corridors: [
      {
        name: 'Hitec City & Mindspace IT Corridor',
        density: 'Global In-House Centers (GCCs) & Developers',
        routes: ['Hitec City Metro ⇄ Cyber Towers ⇄ Knowledge City'],
        views: '82,000 views/auto/day'
      },
      {
        name: 'Banjara Hills & Jubilee Hills Premium Corridors',
        density: 'High Net-Worth Families & Luxury Retailers',
        routes: ['Road No. 36 Jubilee Hills ⇄ Road No. 12 Banjara Hills'],
        views: '75,000 views/auto/day'
      }
    ]
  },
  {
    id: 'pune',
    name: 'Pune IT & Education Hub',
    state: 'Pune & Pimpri-Chinchwad',
    activeFleet: '7,500+ Verified Autos',
    dailyImpressions: '6.1 Million',
    startingRate: '₹1,600/mo',
    overview:
      'Connecting student youth across prestigious colleges and tech professionals in Hinjewadi & Kharadi.',
    corridors: [
      {
        name: 'Hinjewadi Infotech Park Phase 1 to 3',
        density: 'Over 2 Lakh Daily Tech Workers',
        routes: ['Wakad Bridge ⇄ Shivaji Chowk Hinjewadi ⇄ Phase 3'],
        views: '80,000 views/auto/day'
      },
      {
        name: 'FC Road, JM Road & Deccan Gymkhana',
        density: 'College Students & Central Pune Commuters',
        routes: ['Shivajinagar ⇄ Fergusson College Road ⇄ Deccan'],
        views: '72,000 views/auto/day'
      }
    ]
  }
];

export default function CityWiseTargeting({ onTargetCity }) {
  const [selectedCityId, setSelectedCityId] = useState('delhi-ncr');
  const activeCity = CITIES_DATA.find((c) => c.id === selectedCityId) || CITIES_DATA[0];

  const handleWhatsAppCityQuote = (cityName) => {
    const text = encodeURIComponent(
      `Hello AdsWheeler! I want to launch an Auto Rickshaw campaign targeting ${cityName}. Please share available routes and fleet sizes.`
    );
    window.open(`https://wa.me/918057417617?text=${text}`, '_blank');
  };

  return (
    <section id="city-targeting" className="py-8 sm:py-12 bg-white rounded-2xl border border-stone-200 shadow-xs p-4 sm:p-7 my-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 border-b border-stone-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-bold text-teal-800 mb-2">
            <TargetRouteBadge size={16} />
            <span>Geo-Targeted Metro Corridors</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-display">
            City-Wise Transit Targeting
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            Hyper-target your audience by locality, IT tech parks, universities, or metro junctions across India’s busiest cities.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleWhatsAppCityQuote(activeCity.name)}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
        >
          <FaWhatsapp className="w-3.5 h-3.5" />
          <span>Inquire About {activeCity.name.split(' ')[0]}</span>
        </button>
      </div>

      {/* City Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
        {CITIES_DATA.map((city) => {
          const isSelected = city.id === selectedCityId;
          return (
            <button
              key={city.id}
              onClick={() => setSelectedCityId(city.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${isSelected
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                }`}
            >
              <FaLocationDot className={`w-3 h-3 ${isSelected ? 'text-teal-400' : 'text-stone-400'}`} />
              <span>{city.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Selected City Showcase Stage */}
      <div className="bg-stone-50 rounded-2xl border border-stone-200/90 p-5 sm:p-6 space-y-6">
        {/* Top Info Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 font-display">
              {activeCity.name}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">{activeCity.overview}</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-2xs">
              <span className="text-[10px] text-stone-400 block uppercase font-bold">Verified Fleet</span>
              <span className="text-sm font-extrabold text-stone-900">{activeCity.activeFleet}</span>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-2xs">
              <span className="text-[10px] text-stone-400 block uppercase font-bold">Daily Reach</span>
              <span className="text-sm font-extrabold text-teal-700">{activeCity.dailyImpressions}</span>
            </div>
          </div>
        </div>

        {/* Corridors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeCity.corridors.map((c, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-stone-200/90 p-4 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-stone-400">CORRIDOR 0{idx + 1}</span>
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {c.views}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-stone-900 font-display">{c.name}</h4>
                <p className="text-[11px] text-stone-500 mt-1 font-medium">{c.density}</p>
              </div>

              <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-600 space-y-1">
                {c.routes.map((r, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <TargetRouteBadge size={14} className="shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <span className="text-xs text-stone-600 font-medium">
            💡 Need a customized route or exclusivity across specific metro stations?
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                if (onTargetCity) onTargetCity(activeCity);
              }}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Instant Quote for {activeCity.name.split(' ')[0]}</span>
              <FaArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
