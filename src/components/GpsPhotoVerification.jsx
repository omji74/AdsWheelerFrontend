import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flaticon,
  FaCamera,
  FaLocationDot,
  FaCircleCheck,
  FaShieldHalved,
  FaCalendarDays,
  FaArrowRight,
  VerifiedShieldBadge,
  AutoRickshawBadge
} from './RichIcons';

const VERIFIED_AUDIT_PHOTOS = [
  {
    id: 'audit-01',
    plate: 'DL 1RN 4821',
    campaign: 'GO CAB - 50% Off App Launch',
    driver: 'Rameshwar Yadav',
    image: '/images/gocab_auto.jpg',
    timestamp: '27 Oct 2026, 11:42 AM IST',
    location: 'Connaught Place Outer Circle, New Delhi',
    coordinates: '28.6315° N, 77.2167° E',
    hub: 'Delhi Central Hub #01',
    inspector: 'Rajesh Verma (Quality Auditor)',
    status: 'VERIFIED',
    condition: 'Screen Pristine & Calibrated'
  },
  {
    id: 'audit-02',
    plate: 'MH 02 EQ 8814',
    campaign: 'FAST BITES - Order Food Online',
    driver: 'Santosh Shinde',
    image: '/images/fastbites_auto.jpg',
    timestamp: '27 Oct 2026, 02:15 PM IST',
    location: 'Bandra Kurla Complex (BKC), Mumbai',
    coordinates: '19.0657° N, 72.8687° E',
    hub: 'Bandra Installation Bay',
    inspector: 'Amit Kadam (Hub Lead)',
    status: 'VERIFIED',
    condition: 'Screen Mount Tightened & Calibrated'
  },
  {
    id: 'audit-03',
    plate: 'KA 03 AA 9120',
    campaign: 'SHOPY - Grand Festive Sale',
    driver: 'Manjunath Reddy',
    image: '/images/shopy_auto.jpg',
    timestamp: '27 Oct 2026, 04:30 PM IST',
    location: '100 Feet Road, Indiranagar, Bengaluru',
    coordinates: '12.9719° N, 77.6412° E',
    hub: 'Bengaluru East Hub #02',
    inspector: 'Pradeep Gowda (Audit Inspector)',
    status: 'VERIFIED',
    condition: 'Power Feed Verified • 2500 Nits'
  },
  {
    id: 'audit-04',
    plate: 'MH 12 QP 3390',
    campaign: 'ADMISSIONS OPEN 2026-2027',
    driver: 'Ganesh More',
    image: '/images/admissions_auto.jpg',
    timestamp: '27 Oct 2026, 05:10 PM IST',
    location: 'FC Road, Shivajinagar, Pune',
    coordinates: '18.5284° N, 73.8415° E',
    hub: 'Pune Swargate Hub',
    inspector: 'Vikas Patil (Field Supervisor)',
    status: 'VERIFIED',
    condition: 'Display Brightness & Angle Verified'
  }
];

export default function GpsPhotoVerification() {
  const [photos, setPhotos] = useState(VERIFIED_AUDIT_PHOTOS);
  const [searchPlate, setSearchPlate] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(VERIFIED_AUDIT_PHOTOS[0]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Upload Simulation State
  const [uploadPlate, setUploadPlate] = useState('DL 1RN 9942');
  const [uploadDriver, setUploadDriver] = useState('Harish Kumar');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const filteredPhotos = photos.filter(
    (p) =>
      p.plate.toLowerCase().includes(searchPlate.toLowerCase()) ||
      p.campaign.toLowerCase().includes(searchPlate.toLowerCase()) ||
      p.location.toLowerCase().includes(searchPlate.toLowerCase())
  );

  const handleSimulateUpload = (e) => {
    e.preventDefault();
    setUploading(true);

    setTimeout(() => {
      const newEntry = {
        id: `audit-${Date.now()}`,
        plate: uploadPlate.toUpperCase(),
        campaign: 'Brand On Auto Verified Campaign',
        driver: uploadDriver,
        image: '/images/gocab_auto.jpg',
        timestamp: 'Just now (Live Geotagged)',
        location: 'Sector 62, Noida, NCR',
        coordinates: '28.6270° N, 77.3725° E',
        hub: 'NCR East Hub #05',
        inspector: 'Self-Verified via AdsWheeler Mobile App',
        status: 'VERIFIED',
        condition: '100% Passed GPS Geo-fence Check'
      };

      setPhotos([newEntry, ...photos]);
      setSelectedPhoto(newEntry);
      setUploading(false);
      setUploadSuccess(true);

      setTimeout(() => {
        setUploadSuccess(false);
        setShowUploadModal(false);
      }, 1800);
    }, 1200);
  };

  return (
    <section id="gps-verification" className="py-8 sm:py-12 bg-white rounded-2xl border border-stone-200 shadow-xs p-4 sm:p-7 my-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 border-b border-stone-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-2">
            <VerifiedShieldBadge size={16} />
            <span>BrandOnAuto 100% GPS Photo Verification</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-display">
            On-Road Installation Photo Proofs
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            Never wonder if your ad is running. Every auto-rickshaw in our fleet is verified with location-stamped, time-stamped proof photos before and during campaign deployment.
          </p>
        </div>

        {/* Upload Proof Button */}
        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
        >
          <FaCamera className="w-3.5 h-3.5" />
          <span>Upload Verification Photo</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div className="w-full sm:w-80">
          <input
            type="text"
            value={searchPlate}
            onChange={(e) => setSearchPlate(e.target.value)}
            placeholder="Search by Auto Plate No. (e.g. DL 1RN), City or Campaign..."
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
          />
        </div>

        <div className="text-xs font-mono font-bold text-stone-500">
          Showing {filteredPhotos.length} Geotagged Audits
        </div>
      </div>

      {/* Main Grid: Gallery + Inspector View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Grid of Verified Photos */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredPhotos.map((item) => {
            const isSelected = selectedPhoto.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className={`bg-stone-50 rounded-xl border overflow-hidden transition-all cursor-pointer shadow-xs ${
                  isSelected
                    ? 'border-emerald-600 ring-2 ring-emerald-600/20 bg-white'
                    : 'border-stone-200 hover:border-stone-300 hover:bg-white'
                }`}
              >
                {/* Photo with GPS Stamp */}
                <div className="relative aspect-[4/3] bg-stone-900 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.campaign}
                    className="w-full h-full object-cover"
                  />
                  {/* Verified Badge */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-600/95 backdrop-blur-sm text-white text-[10px] font-bold flex items-center gap-1 shadow">
                    <FaCircleCheck className="w-2.5 h-2.5" />
                    <span>GPS VERIFIED</span>
                  </div>

                  {/* Geotag Strip */}
                  <div className="absolute bottom-0 inset-x-0 bg-stone-950/85 backdrop-blur-md p-2 text-white text-[10px] font-mono flex items-center justify-between">
                    <span className="truncate max-w-[180px]">{item.coordinates}</span>
                    <span className="text-emerald-400 font-bold">{item.plate}</span>
                  </div>
                </div>

                {/* Card Meta */}
                <div className="p-3.5 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-stone-900 truncate max-w-[200px]">
                      {item.campaign}
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-600 flex items-center gap-1">
                    <FaLocationDot className="w-3 h-3 text-stone-400 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-stone-200/70 text-[10px] text-stone-500 font-mono">
                    <span>{item.timestamp}</span>
                    <span className="font-bold text-emerald-700">Driver: {item.driver.split(' ')[0]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Geotag Certificate Inspector */}
        <div className="lg:col-span-4 bg-stone-50 rounded-xl border border-stone-200 p-4 space-y-4 sticky top-20">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <span className="text-[10px] uppercase font-bold text-emerald-800 font-mono flex items-center gap-1">
              <VerifiedShieldBadge size={16} />
              <span>Audit Certificate #{selectedPhoto.id}</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              {selectedPhoto.status}
            </span>
          </div>

          <div className="aspect-[4/3] rounded-lg overflow-hidden border border-stone-300 relative shadow-inner">
            <img
              src={selectedPhoto.image}
              alt={selectedPhoto.campaign}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Campaign Title</span>
              <span className="font-bold text-stone-900 block leading-tight mt-0.5">
                {selectedPhoto.campaign}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-200/80">
              <div>
                <span className="text-[10px] text-stone-500 block">Auto Registration:</span>
                <span className="font-mono font-bold text-stone-900 bg-stone-200 px-1.5 py-0.5 rounded text-[11px] inline-block mt-0.5">
                  {selectedPhoto.plate}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 block">Assigned Driver:</span>
                <span className="font-semibold text-stone-900 block mt-0.5">{selectedPhoto.driver}</span>
              </div>
            </div>

            <div className="pt-1 border-t border-stone-200/80 space-y-1">
              <span className="text-[10px] text-stone-500 block">GPS Coordinates:</span>
              <span className="font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-1 rounded block border border-emerald-200 text-[11px]">
                {selectedPhoto.coordinates}
              </span>
              <span className="text-[11px] text-stone-600 block">{selectedPhoto.location}</span>
            </div>

            <div className="pt-1 border-t border-stone-200/80 space-y-1">
              <span className="text-[10px] text-stone-500 block">Hub Auditor & Date:</span>
              <span className="text-[11px] font-medium text-stone-800 block">
                {selectedPhoto.inspector}
              </span>
              <span className="text-[10px] text-stone-500 font-mono block">
                {selectedPhoto.timestamp}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Proof Simulation Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-stone-200 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <FaCamera className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-sm font-bold text-stone-900 font-display">
                    Upload Geotagged Installation Proof
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="text-stone-400 hover:text-stone-700 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSimulateUpload} className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Auto Rickshaw Number Plate
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadPlate}
                    onChange={(e) => setUploadPlate(e.target.value)}
                    placeholder="e.g. DL 1RN 9942"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Driver / Hub Inspector Name
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadDriver}
                    onChange={(e) => setUploadDriver(e.target.value)}
                    placeholder="e.g. Harish Kumar"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                  />
                </div>

                <div className="p-4 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 text-center space-y-1">
                  <FaCamera className="w-6 h-6 text-stone-400 mx-auto" />
                  <span className="font-bold text-stone-800 block text-xs">Select or Capture Rear Auto Photo</span>
                  <span className="text-[10px] text-stone-500 block">
                    Camera GPS metadata will be extracted automatically
                  </span>
                </div>

                {uploadSuccess ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-center font-bold">
                    ✓ Verified! Geotag 28.6270° N, 77.3725° E attached to campaign log.
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <span>Extracting GPS & Auditing...</span>
                    ) : (
                      <>
                        <FaCircleCheck className="w-3.5 h-3.5" />
                        <span>Submit Installation Proof</span>
                      </>
                    )}
                  </button>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
