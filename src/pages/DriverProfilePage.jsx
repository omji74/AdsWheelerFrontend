import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flaticon,
  AutoRickshawBadge,
  ElectricTotoBadge,
  RupeePayoutBadge,
  VerifiedShieldBadge,
  UpiPaymentBadge,
  FaIndianRupeeSign,
  FaArrowRight,
  FaPhone,
  FaUser,
  FaLocationDot,
  FaBolt,
  FaCarSide,
  FaCircleCheck
} from '../components/RichIcons';
import {
  Edit3,
  Check,
  ShieldCheck,
  MapPin,
  Phone,
  CreditCard,
  Building,
  QrCode,
  Calendar,
  ExternalLink,
  Save,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCampaign } from '../context/CampaignContext';

export default function DriverProfilePage() {
  const { currentUser, updateProfile } = useAuth();
  const { showToast, applications } = useCampaign();

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Profile data state
  const isEv = currentUser?.profile?.vehicle_type === 'E_RICKSHAW';
  const defaultVehicleType = isEv ? 'E_RICKSHAW' : 'AUTO_RICKSHAW';

  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Transit Partner Driver',
    phone: currentUser?.phone || '9876543210',
    vehicle_type: currentUser?.profile?.vehicle_type || 'AUTO_RICKSHAW',
    vehicle_registration_number:
      currentUser?.profile?.vehicle_registration_number || 'DL 1RA 4892',
    city: currentUser?.profile?.city || 'Delhi NCR',
    upi_id: currentUser?.profile?.upi_id || `${currentUser?.phone || '9876543210'}@paytm`
  });

  // Calculate quick stats from applications
  const myApplications = (applications || []).filter(
    (a) => !currentUser?.id || String(a.driver_id) === String(currentUser.id)
  );
  const activeCount = myApplications.filter((a) => a.status === 'ACTIVE').length;
  const totalEarned = myApplications
    .filter((a) => a.payment_status === 'PAID')
    .reduce((sum, a) => sum + Number(a.amount || 0), 0);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        profile: {
          vehicle_type: formData.vehicle_type,
          vehicle_registration_number: formData.vehicle_registration_number.trim(),
          city: formData.city.trim(),
          upi_id: formData.upi_id.trim()
        }
      });
      setIsEditing(false);
      showToast('Profile updated successfully!');
    } catch (err) {
      showToast(err.message || 'Failed to update profile', 'info');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
            <Link to="/driver/dashboard" className="hover:text-teal-700 transition-colors">
              Driver Hub
            </Link>
            <span>/</span>
            <span className="text-stone-800 font-semibold">Driver Profile</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-stone-900 font-display tracking-tight">
            My Driver Profile
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage your personal vehicle details and direct monthly UPI payout information
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="py-2 px-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-98"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="py-2 px-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </button>
          )}

          <Link
            to="/driver/dashboard"
            className="py-2 px-3.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
          >
            <span>My Contracts</span>
            <FaArrowRight className="w-2.5 h-2.5" />
          </Link>
        </div>
      </div>

      {/* Main Simplified Profile Overview Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-stone-200 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-teal-500/10 via-teal-500/5 to-transparent rounded-bl-full pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-6 border-b border-stone-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100/70 border-2 border-teal-200 flex items-center justify-center shrink-0 shadow-xs">
              {formData.vehicle_type === 'E_RICKSHAW' ? (
                <ElectricTotoBadge size={50} />
              ) : (
                <AutoRickshawBadge size={50} />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-display">
                  {currentUser?.name || formData.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <VerifiedShieldBadge size={14} /> Verified Partner
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  {currentUser?.phone || formData.phone}
                </span>
                <span className="text-stone-300">•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  {currentUser?.profile?.city || formData.city}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-[10px] font-mono font-bold bg-stone-100 text-stone-600 px-2 py-0.5 rounded border border-stone-200">
                  ID: AW-DRV-{currentUser?.id || '2489'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 sm:gap-6 bg-stone-50 p-3 sm:p-4 rounded-xl border border-stone-200/80 w-full sm:w-auto justify-around">
            <div className="text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                Active Wraps
              </span>
              <span className="text-lg font-extrabold text-teal-700 font-display">
                {activeCount} Auto{activeCount === 1 ? '' : 's'}
              </span>
            </div>
            <div className="h-7 w-[1px] bg-stone-200" />
            <div className="text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                UPI Credited
              </span>
              <span className="text-lg font-extrabold text-stone-900 font-display">
                ₹{totalEarned.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Edit Form Toggle vs Display Cards */}
        <AnimatePresence mode="wait">
          {isEditing ? (
            /* ======================================================== */
            /* INLINE EDIT MODE (CLEAN, SIMPLE, ZERO COMPLICATION)      */
            /* ======================================================== */
            <motion.form
              key="edit"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSave}
              className="pt-6 space-y-5"
            >
              <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl text-xs text-teal-900 font-medium flex items-center justify-between">
                <span>Edit your basic driver, vehicle, and UPI details below. Click save when done.</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
                  Quick Edit
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Driver Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-11 bg-stone-50 border border-stone-200 rounded-xl px-3.5 text-sm text-stone-900 focus:outline-none focus:border-teal-700"
                    placeholder="e.g. Ramesh Kumar"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Phone Number (SMS & WhatsApp updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-11 bg-stone-50 border border-stone-200 rounded-xl px-3.5 text-sm text-stone-900 focus:outline-none focus:border-teal-700"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Vehicle Type *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, vehicle_type: 'AUTO_RICKSHAW' })}
                      className={`h-11 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                        formData.vehicle_type === 'AUTO_RICKSHAW'
                          ? 'border-teal-700 bg-teal-50 text-teal-900'
                          : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      <AutoRickshawBadge size={22} />
                      <span>CNG Auto</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, vehicle_type: 'E_RICKSHAW' })}
                      className={`h-11 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                        formData.vehicle_type === 'E_RICKSHAW'
                          ? 'border-teal-700 bg-teal-50 text-teal-900'
                          : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      <ElectricTotoBadge size={22} />
                      <span>E-Rickshaw EV</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Vehicle Plate Number (RC) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.vehicle_registration_number}
                    onChange={(e) =>
                      setFormData({ ...formData, vehicle_registration_number: e.target.value })
                    }
                    className="w-full h-11 bg-stone-50 border border-stone-200 rounded-xl px-3.5 text-sm text-stone-900 uppercase font-mono tracking-wider focus:outline-none focus:border-teal-700"
                    placeholder="e.g. DL 1RA 4892"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Operating City / Transit Corridor *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full h-11 bg-stone-50 border border-stone-200 rounded-xl px-3.5 text-sm text-stone-900 focus:outline-none focus:border-teal-700"
                    placeholder="e.g. Delhi NCR, Noida, Mumbai"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Direct UPI ID for Monthly Bank Credits *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.upi_id}
                      onChange={(e) => setFormData({ ...formData, upi_id: e.target.value })}
                      className="w-full h-11 bg-stone-50 border border-stone-200 rounded-xl px-3.5 text-sm text-stone-900 focus:outline-none focus:border-teal-700"
                      placeholder="e.g. 9876543210@paytm, ramesh@okhdfcbank"
                    />
                  </div>
                  <span className="text-[11px] text-stone-400 mt-1 block">
                    Payouts are credited directly to this UPI on the 1st of every month.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-xs cursor-pointer active:scale-98 disabled:opacity-60"
                >
                  {saving ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          ) : (
            /* ======================================================== */
            /* SIMPLIFIED 3-CARD DISPLAY SECTION                        */
            /* ======================================================== */
            <motion.div
              key="view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Card 1: Vehicle Details */}
              <div className="bg-stone-50/80 rounded-xl p-4 border border-stone-200/90 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-teal-700/10 text-teal-800 flex items-center justify-center">
                      <FaCarSide className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-stone-900">Vehicle Specification</span>
                  </div>
                  <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    Active on Road
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-stone-500 font-medium">Model / Fuel:</span>
                    <span className="font-bold text-stone-900">
                      {formData.vehicle_type === 'E_RICKSHAW'
                        ? 'Electric Toto E-Rickshaw (EV)'
                        : 'Bajaj RE Auto Rickshaw (CNG)'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-stone-500 font-medium">Number Plate:</span>
                    <span className="font-mono font-bold text-xs bg-amber-50 text-amber-900 px-2.5 py-1 rounded border border-amber-200">
                      {currentUser?.profile?.vehicle_registration_number ||
                        formData.vehicle_registration_number}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-stone-500 font-medium">City Corridor:</span>
                    <span className="font-semibold text-stone-800">
                      {currentUser?.profile?.city || formData.city}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-stone-500 font-medium">Wrap Installation:</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> 100% Free at Hub
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: UPI & Monthly Bank Payout */}
              <div className="bg-stone-50/80 rounded-xl p-4 border border-stone-200/90 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-700/10 text-emerald-800 flex items-center justify-center">
                      <CreditCard className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-stone-900">Direct Monthly UPI Payout</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Verified Bank
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-stone-500 font-medium">Disbursement:</span>
                    <span className="font-bold text-stone-900">1st of Every Month</span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-stone-500 font-medium">UPI VPA:</span>
                    <span className="font-mono font-bold text-teal-800 bg-white px-2 py-0.5 rounded border border-stone-200">
                      {currentUser?.profile?.upi_id || formData.upi_id}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-stone-500 font-medium">Transfer Speed:</span>
                    <span className="text-stone-700 font-semibold">Instant IMPS / UPI Direct</span>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[11px] text-stone-500">
                    <span>Need to switch bank account?</span>
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="font-bold text-teal-700 hover:underline cursor-pointer"
                    >
                      Change UPI ID
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Simplified Verification & Hub Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Hub Box */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-teal-700">
            <Building className="w-4 h-4" />
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Assigned Partner Hub
            </h3>
          </div>
          <p className="text-sm font-bold text-stone-900">
            Mayapuri Transit Center Hub #3
          </p>
          <p className="text-xs text-stone-500 leading-relaxed">
            Free high-grade vinyl wrap installation, quick routine inspection, and driver assistance.
          </p>
          <div className="pt-1 text-xs text-teal-700 font-bold">
            Hours: 9:00 AM – 7:00 PM (Daily)
          </div>
        </div>

        {/* QR Transit Pass */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-teal-700">
            <QrCode className="w-4 h-4" />
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Driver Transit Pass
            </h3>
          </div>
          <p className="text-sm font-bold text-stone-900">
            Pass ID: AW-PASS-{currentUser?.id || '8812'}
          </p>
          <p className="text-xs text-stone-500 leading-relaxed">
            Show this verification pass at any AdsWheeler hub for priority zero-wait installation.
          </p>
          <div className="pt-1 text-xs text-emerald-700 font-bold flex items-center gap-1">
            <FaCircleCheck className="w-3 h-3" /> Fully Verified & Active
          </div>
        </div>

        {/* Quick Campaign Acceptance CTA */}
        <div className="bg-gradient-to-br from-teal-800 to-teal-900 text-white rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-200 block mb-1">
              Ready to Earn More?
            </span>
            <h3 className="text-base font-bold font-display leading-tight">
              Accept Open Brand Campaigns
            </h3>
            <p className="text-xs text-teal-100/80 mt-1 leading-relaxed">
              Earn ₹3,000 to ₹8,000 every month on regular auto routes.
            </p>
          </div>

          <Link
            to="/marketplace"
            className="py-2 px-3 rounded-xl bg-white text-teal-900 hover:bg-teal-50 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Browse Available Ads</span>
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
