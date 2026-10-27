import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Flaticon,
  FaTv,
  FaShieldHalved,
  FaLocationDot,
  FaRegEye,
  FaBolt,
  FaChartLine,
  FaCircleCheck,
  FaTruckFast,
  FaGasPump,
  FaQrcode,
  VerifiedShieldBadge,
  TargetRouteBadge,
  AutoRickshawBadge
} from './RichIcons';

const MOCK_ACTIVE_FLEET = [
  {
    plate: 'DL 1RN 4821',
    driver: 'Rameshwar Yadav',
    model: 'Bajaj RE CNG',
    hub: 'South Delhi Hub #02',
    route: 'Connaught Place ⇄ Nehru Place',
    status: 'ACTIVE_ON_ROAD',
    liveKmToday: '112 km',
    impressionsToday: '84,100',
    lastSync: '4 mins ago',
    verified: true,
    image: '/images/gocab_auto.jpg'
  },
  {
    plate: 'MH 02 EQ 8814',
    driver: 'Santosh Shinde',
    model: 'Bajaj Compact 4S',
    hub: 'Andheri West Hub #01',
    route: 'BKC Bandra ⇄ Western Express',
    status: 'ACTIVE_ON_ROAD',
    liveKmToday: '128 km',
    impressionsToday: '96,400',
    lastSync: 'Just now',
    verified: true,
    image: '/images/fastbites_auto.jpg'
  },
  {
    plate: 'KA 03 AA 9120',
    driver: 'Manjunath Reddy',
    model: 'Bajaj Maxima Z',
    hub: 'Indiranagar Hub #03',
    route: 'Koramangala ⇄ Electronic City',
    status: 'ACTIVE_ON_ROAD',
    liveKmToday: '98 km',
    impressionsToday: '74,200',
    lastSync: '12 mins ago',
    verified: true,
    image: '/images/shopy_auto.jpg'
  },
  {
    plate: 'MH 12 QP 3390',
    driver: 'Ganesh More',
    model: 'Bajaj RE Green CNG',
    hub: 'Pune Swargate Hub',
    route: 'Kothrud ⇄ Hinjewadi Phase 1',
    status: 'HUB_INSPECTION',
    liveKmToday: '64 km',
    impressionsToday: '48,000',
    lastSync: 'Scheduled Audit',
    verified: true,
    image: '/images/admissions_auto.jpg'
  }
];

export default function CampaignDashboard({ onExploreFleet, onOpenInstantQuote }) {
  const [activeTab, setActiveTab] = useState('deployment'); // 'deployment' | 'routes' | 'analytics'
  const [selectedVehicle, setSelectedVehicle] = useState(MOCK_ACTIVE_FLEET[0]);

  return (
    <section id="campaign-dashboard" className="py-8 sm:py-12 bg-white rounded-2xl border border-stone-200 shadow-xs p-4 sm:p-7 my-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 border-b border-stone-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-bold text-teal-800 mb-2">
            <FaChartLine className="w-3.5 h-3.5 text-teal-600" />
            <span>BrandOnAuto Live Campaign Telemetry & Fleet Tracker</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-display">
            Real-Time Campaign Tracking Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            Monitor auto rickshaw fleet deployment in real-time. Track installation audits, daily street kilometers, and commuter reach verified by GPS.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200/80">
          {[
            { id: 'deployment', label: 'Fleet Pipeline', flaticon: 'car' },
            { id: 'routes', label: 'Transit Routes', flaticon: 'map-marker' },
            { id: 'analytics', label: 'Reach Analytics', flaticon: 'chart-pie-alt' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Flaticon name={tab.flaticon} style="sr" className="text-xs" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4-Stage Deployment Progress Pipeline */}
      <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-4 sm:p-6 mb-6">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 mb-4">
          <span className="text-xs font-bold text-stone-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Campaign: GO CAB Mobility 50-Auto Blitz</span>
          </span>
          <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            84% FLEET LIVE ON-ROAD
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {[
            { step: '01', title: 'Creative Approved', status: 'COMPLETED', detail: 'Digital screen aspect approved', pct: 100 },
            { step: '02', title: 'Media Synced / Printed', status: 'COMPLETED', detail: '50 Displays configured', pct: 100 },
            { step: '03', title: 'Hub Quality Audit', status: 'IN_PROGRESS', detail: '44 of 50 Autos passed inspection', pct: 88 },
            { step: '04', title: 'Live On-Road Fleet', status: 'ACTIVE', detail: '42 Autos currently rolling', pct: 84 }
          ].map((stage, idx) => (
            <div
              key={stage.step}
              className="bg-white p-3.5 rounded-xl border border-stone-200/90 shadow-xs relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-extrabold text-stone-400">STAGE {stage.step}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <FaCircleCheck className="w-2.5 h-2.5 text-emerald-600" />
                  {stage.pct}%
                </span>
              </div>
              <h4 className="text-xs font-extrabold text-stone-900 font-display">{stage.title}</h4>
              <p className="text-[11px] text-stone-500 mt-1 leading-snug">{stage.detail}</p>
              <div className="w-full bg-stone-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-teal-700 h-full rounded-full transition-all duration-500"
                  style={{ width: `${stage.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Tab Panels */}
      {activeTab === 'deployment' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Active Autos Table */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider font-display">
                  Live Vehicle Telemetry (Verified CNG Autos)
                </h3>
                <span className="text-[11px] text-stone-500">Click any auto to inspect live GPS audit stamp & photo</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                4 Autos Online
              </span>
            </div>

            <div className="divide-y divide-stone-100 overflow-x-auto">
              {MOCK_ACTIVE_FLEET.map((vehicle) => {
                const isSelected = selectedVehicle.plate === vehicle.plate;
                return (
                  <div
                    key={vehicle.plate}
                    onClick={() => setSelectedVehicle(vehicle)}
                    className={`p-3.5 flex items-center justify-between gap-4 transition-colors cursor-pointer text-xs ${
                      isSelected ? 'bg-teal-50/70' : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-300 shrink-0">
                        <img src={vehicle.image} alt={vehicle.plate} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-stone-900 bg-stone-100 px-1.5 py-0.5 rounded text-[11px]">
                            {vehicle.plate}
                          </span>
                          <span className="font-semibold text-stone-800">{vehicle.driver}</span>
                        </div>
                        <span className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                          <FaLocationDot className="w-3 h-3 text-stone-400" />
                          {vehicle.route}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div className="hidden sm:block">
                        <span className="text-[10px] text-stone-400 uppercase block font-semibold">Today's Km</span>
                        <span className="font-mono font-bold text-stone-800">{vehicle.liveKmToday}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase block font-semibold">Views</span>
                        <span className="font-mono font-bold text-teal-700">{vehicle.impressionsToday}</span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-[10px] font-bold shrink-0 ${
                          vehicle.status === 'ACTIVE_ON_ROAD'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {vehicle.status === 'ACTIVE_ON_ROAD' ? 'ON ROAD' : 'IN AUDIT'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Vehicle Detail Card */}
          <div className="lg:col-span-4 bg-stone-50 rounded-xl border border-stone-200 p-4 space-y-4">
            <div className="border-b border-stone-200 pb-2">
              <span className="text-[10px] uppercase font-bold text-teal-700 tracking-wider font-mono">
                Selected Auto Telemetry
              </span>
              <h4 className="text-sm font-bold text-stone-900 mt-0.5 font-display">
                {selectedVehicle.plate} • {selectedVehicle.driver}
              </h4>
            </div>

            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-stone-300 relative">
              <img src={selectedVehicle.image} alt={selectedVehicle.plate} className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-stone-950/80 backdrop-blur-md text-[10px] text-emerald-400 font-mono">
                GPS Verified • {selectedVehicle.lastSync}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-200/70">
                <span className="text-stone-500">Chassis Model:</span>
                <span className="font-semibold text-stone-800">{selectedVehicle.model}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/70">
                <span className="text-stone-500">Inspection Hub:</span>
                <span className="font-semibold text-stone-800">{selectedVehicle.hub}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/70">
                <span className="text-stone-500">Current Transit Route:</span>
                <span className="font-semibold text-stone-800 text-right">{selectedVehicle.route}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Hardware Audit:</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <FaCircleCheck className="w-3 h-3" /> Screen Clean & Active
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transit Routes Tab */}
      {activeTab === 'routes' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              city: 'Delhi NCR Corridor',
              routes: ['Connaught Place ⇄ ITO ⇄ Laxmi Nagar', 'South Extension ⇄ Saket ⇄ Nehru Place', 'Cyber City ⇄ Golf Course Road ⇄ MG Road'],
              density: 'High Density (85k views/auto)',
              activeFleet: 124
            },
            {
              city: 'Mumbai Western Express',
              routes: ['BKC Bandra ⇄ Domestic Airport', 'Andheri West ⇄ Lokhandwala ⇄ Juhu', 'Dadar TT ⇄ Lower Parel Corporate Hub'],
              density: 'Bumper-to-Bumper (98k views/auto)',
              activeFleet: 180
            },
            {
              city: 'Bengaluru Tech Corridor',
              routes: ['Koramangala 100ft Road ⇄ HSR Layout', 'Indiranagar 100ft ⇄ Old Airport Road', 'Whitefield ITPL ⇄ Marathahalli'],
              density: 'Captive IT Techies (82k views/auto)',
              activeFleet: 95
            }
          ].map((corridor) => (
            <div key={corridor.city} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-stone-900 font-display">{corridor.city}</h4>
                <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {corridor.activeFleet} Active Autos
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-stone-600">
                {corridor.routes.map((r) => (
                  <div key={r} className="flex items-start gap-1.5">
                    <TargetRouteBadge size={16} className="shrink-0 mt-0.5" />
                    <span className="text-[11px]">{r}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-stone-200 text-[11px] font-bold text-stone-700 flex items-center justify-between">
                <span>Traffic Density:</span>
                <span className="text-teal-700">{corridor.density}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Weekly Total Impressions</span>
              <span className="text-xl font-black text-stone-900 font-mono mt-1 block">4,280,000+</span>
              <span className="text-[10px] text-emerald-600 font-bold">↑ 14% vs previous week</span>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Avg Street Distance</span>
              <span className="text-xl font-black text-stone-900 font-mono mt-1 block">118 km/day</span>
              <span className="text-[10px] text-stone-500">Per vehicle average</span>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Peak Commute Hours</span>
              <span className="text-xl font-black text-stone-900 font-mono mt-1 block">8am-11am & 6pm-10pm</span>
              <span className="text-[10px] text-amber-600 font-bold">Highest footfall</span>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Effective Campaign CPM</span>
              <span className="text-xl font-black text-teal-700 font-mono mt-1 block">₹18.4</span>
              <span className="text-[10px] text-stone-500">Industry lowest transit CPM</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
