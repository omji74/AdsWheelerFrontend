import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flaticon,
  AutoRickshawBadge,
  PublisherMegaphoneBadge,
  RupeePayoutBadge,
  VerifiedShieldBadge,
  TargetRouteBadge,
  ElectricTotoBadge,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUser,
  FaArrowRight,
  FaCircleCheck,
  FaRegEye,
  FaRegEyeSlash,
  FaBuilding,
  FaCarSide,
  FaStore,
  FaLocationDot,
  FaBolt
} from './RichIcons';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { apiLogin, apiRegister } from '../api/client';

export default function AuthPage({ onAuthSuccess, onContinueGuest, initialRole = 'DRIVER' }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [role, setRole] = useState(initialRole); // 'DRIVER' | 'PUBLISHER'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    vehicle_type: 'AUTO_RICKSHAW',
    vehicle_registration_number: '',
    city: 'New Delhi',
    business_name: '',
    business_category: 'Retail & E-Commerce'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'login') {
        if (!formData.email || !formData.password) {
          throw new Error('Please enter your email and password.');
        }
        const res = await apiLogin({
          email: formData.email,
          password: formData.password,
          role
        });
        if (res.success && res.user) {
          onAuthSuccess(res.user);
        }
      } else {
        // Sign Up
        if (!formData.name || !formData.email || !formData.phone || !formData.password) {
          throw new Error('Please fill in your name, email, phone, and password.');
        }

        const res = await apiRegister({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          password: formData.password,
          role,
          driver_profile:
            role === 'DRIVER'
              ? {
                  vehicle_type: formData.vehicle_type,
                  vehicle_registration_number:
                    formData.vehicle_registration_number.trim() || 'Transit Registered',
                  city: formData.city.trim() || 'Delhi NCR'
                }
              : undefined,
          publisher_profile:
            role === 'PUBLISHER'
              ? {
                  business_name: formData.business_name.trim() || formData.name.trim(),
                  business_category: formData.business_category,
                  city: formData.city.trim() || 'Delhi NCR'
                }
              : undefined
        });

        if (res.success && res.user) {
          onAuthSuccess(res.user);
        }
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1917] flex flex-col justify-between font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Mobile-Friendly Navbar */}
      <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-white/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-teal-700 flex items-center justify-center text-white shadow-xs">
            <Flaticon name="car" style="sr" className="text-base text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-stone-900 tracking-tight font-display">
                AdsWheeler
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                Transit
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onContinueGuest}
          className="text-xs font-semibold text-stone-600 hover:text-teal-700 flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <span>Guest View</span>
          <FaArrowRight className="w-3 h-3 text-stone-500" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Simple & Friendly Value Proposition (Desktop only or clean banner on mobile) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-semibold text-teal-900">
             <span>Simple, Verified & Transparent</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight font-display leading-tight">
              {role === 'DRIVER' ? (
                <>
                  Earn <span className="text-teal-700">₹3,000 – ₹8,000</span> every month on your auto.
                </>
              ) : (
                <>
                  Advertise on <span className="text-teal-700">10,000+ autos</span> in your city.
                </>
              )}
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {role === 'DRIVER'
                ? 'Wrap your Auto Rickshaw or E-Rickshaw with certified brand posters. Get free installation at our hubs and receive guaranteed direct monthly UPI payments.'
                : 'Put your brand stickers and wraps on daily commuter autos. High street visibility, verified routes, and simple driver approvals.'}
            </p>

            {/* Rich Flaticon Feature Pills */}
            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {role === 'DRIVER' ? (
                <>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-stone-200/90 shadow-xs text-xs hover:border-emerald-300 transition-colors">
                    <RupeePayoutBadge size={30} />
                    <div>
                      <span className="font-bold text-stone-900 block">Direct UPI Bank Transfer</span>
                      <span className="text-stone-500 text-[11px]">Guaranteed monthly payout disbursed on 1st of every month</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-stone-200/90 shadow-xs text-xs hover:border-teal-300 transition-colors">
                    <VerifiedShieldBadge size={30} />
                    <div>
                      <span className="font-bold text-stone-900 block">Zero Deposit & Free Hub Wrap</span>
                      <span className="text-stone-500 text-[11px]">Professional vinyl install at nearest partner hub at no cost</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-stone-200/90 shadow-xs text-xs hover:border-amber-300 transition-colors">
                    <AutoRickshawBadge size={30} />
                    <div>
                      <span className="font-bold text-stone-900 block">All Auto Types Accepted</span>
                      <span className="text-stone-500 text-[11px]">Bajaj CNG Auto Rickshaw & Electric Toto E-Rickshaws eligible</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-stone-200/90 shadow-xs text-xs hover:border-indigo-300 transition-colors">
                    <TargetRouteBadge size={30} />
                    <div>
                      <span className="font-bold text-stone-900 block">Hyper-Local City Targeting</span>
                      <span className="text-stone-500 text-[11px]">Deploy ads across Delhi NCR, Mumbai, Bengaluru high-density routes</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-stone-200/90 shadow-xs text-xs hover:border-blue-300 transition-colors">
                    <PublisherMegaphoneBadge size={30} />
                    <div>
                      <span className="font-bold text-stone-900 block">Rapid 2-Minute Campaign Launch</span>
                      <span className="text-stone-500 text-[11px]">Upload wrap design, pick fleet size, and start receiving driver bids</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-stone-200/90 shadow-xs text-xs hover:border-teal-300 transition-colors">
                    <VerifiedShieldBadge size={30} />
                    <div>
                      <span className="font-bold text-stone-900 block">1-Click Driver Approvals</span>
                      <span className="text-stone-500 text-[11px]">Inspect driver chassis info, phone, and route before activating</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Clean, Mobile-First Auth Box */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-7">
              {/* Step 1: Big Role Switcher Cards with Rich Flaticon Badges */}
              <div className="mb-5">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                  Select Who You Are:
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setRole('DRIVER');
                      setError('');
                    }}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-2.5 cursor-pointer ${
                      role === 'DRIVER'
                        ? 'border-teal-700 bg-teal-50/70 shadow-xs ring-2 ring-teal-700/10'
                        : 'border-stone-200 bg-stone-50/70 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <AutoRickshawBadge size={44} />
                      {role === 'DRIVER' ? (
                        <FaCircleCheck className="w-4 h-4 text-teal-700" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-stone-300" />
                      )}
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-stone-900 block">
                        Auto Driver
                      </span>
                      <span className="text-[11px] text-stone-500 block leading-tight">
                        I want to earn monthly
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRole('PUBLISHER');
                      setError('');
                    }}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-2.5 cursor-pointer ${
                      role === 'PUBLISHER'
                        ? 'border-teal-700 bg-teal-50/70 shadow-xs ring-2 ring-teal-700/10'
                        : 'border-stone-200 bg-stone-50/70 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <PublisherMegaphoneBadge size={44} />
                      {role === 'PUBLISHER' ? (
                        <FaCircleCheck className="w-4 h-4 text-teal-700" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-stone-300" />
                      )}
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-stone-900 block">
                        Ad Publisher
                      </span>
                      <span className="text-[11px] text-stone-500 block leading-tight">
                        I want to post ads
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 2: Tab Switcher (Log In vs Create Account) */}
              <div className="flex bg-stone-100 p-1 rounded-xl mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError('');
                  }}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                    mode === 'login'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setError('');
                  }}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                    mode === 'signup'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Sign Up (New User)
                </button>
              </div>

              {/* Demo Account Quick Fill */}
              {mode === 'login' && (
                <div className="mb-4 p-2.5 bg-stone-50 rounded-xl border border-stone-200/80">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
                    Quick Demo Credentials:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setRole('DRIVER');
                        setFormData((prev) => ({
                          ...prev,
                          email: 'rajesh.auto@gmail.com',
                          password: 'password123'
                        }));
                        setError('');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 hover:border-teal-600 hover:text-teal-800 text-[11px] font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span>⚡ Auto Driver (Rajesh)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRole('PUBLISHER');
                        setFormData((prev) => ({
                          ...prev,
                          email: 'ads@zomato.com',
                          password: 'password123'
                        }));
                        setError('');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 hover:border-teal-600 hover:text-teal-800 text-[11px] font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span>⚡ Publisher (Zomato)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                  ⚠️ {error}
                </div>
              )}

              {/* Step 3: Clean, Streamlined Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <FaUser className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={role === 'DRIVER' ? 'e.g. Ramesh Kumar' : 'e.g. Siddharth Sharma'}
                        className="w-full h-11 bg-stone-50/70 border border-stone-200 rounded-xl pl-10 pr-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <FaEnvelope className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={role === 'DRIVER' ? 'driver@gmail.com' : 'brand@company.com'}
                      className="w-full h-11 bg-stone-50/70 border border-stone-200 rounded-xl pl-10 pr-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                    />
                  </div>
                </div>

                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Mobile Number (for UPI payments & updates) *
                    </label>
                    <div className="relative">
                      <FaPhone className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full h-11 bg-stone-50/70 border border-stone-200 rounded-xl pl-10 pr-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <FaLock className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter password"
                      className="w-full h-11 bg-stone-50/70 border border-stone-200 rounded-xl pl-10 pr-10 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
                    >
                      {showPassword ? <FaRegEyeSlash className="w-4 h-4" /> : <FaRegEye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Driver-specific details on Sign Up */}
                {mode === 'signup' && role === 'DRIVER' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Vehicle Type
                      </label>
                      <select
                        value={formData.vehicle_type}
                        onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })}
                        className="w-full h-11 bg-stone-50/70 border border-stone-200 rounded-xl px-3 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-teal-700"
                      >
                        <option value="AUTO_RICKSHAW">Auto Rickshaw (CNG)</option>
                        <option value="E_RICKSHAW">E-Rickshaw (Electric EV)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Plate Number
                      </label>
                      <input
                        type="text"
                        value={formData.vehicle_registration_number}
                        onChange={(e) =>
                          setFormData({ ...formData, vehicle_registration_number: e.target.value })
                        }
                        placeholder="e.g. DL 1RA 4892"
                        className="w-full h-11 bg-stone-50/70 border border-stone-200 rounded-xl px-3 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-teal-700"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        City / Driving Area
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Delhi NCR, Noida, Mumbai"
                        className="w-full h-11 bg-stone-50/70 border border-stone-200 rounded-xl px-3 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-teal-700"
                      />
                    </div>
                  </div>
                )}

                {/* Publisher-specific details on Sign Up */}
                {mode === 'signup' && role === 'PUBLISHER' && (
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Company / Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.business_name}
                        onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                        placeholder="e.g. Zepto, Fitness Hub, Fresh Mart"
                        className="w-full h-11 bg-stone-50/70 border border-stone-200 rounded-xl px-3 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-teal-700"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Category
                        </label>
                        <select
                          value={formData.business_category}
                          onChange={(e) =>
                            setFormData({ ...formData, business_category: e.target.value })
                          }
                          className="w-full h-11 bg-stone-50/70 border border-stone-200 rounded-xl px-3 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-teal-700"
                        >
                          <option value="Retail & E-Commerce">Retail & E-Commerce</option>
                          <option value="Food & Dining">Food & Dining</option>
                          <option value="Fitness & Gym">Fitness & Gym</option>
                          <option value="Healthcare & Pharma">Healthcare & Pharma</option>
                          <option value="Tech & Apps">Tech & Mobile Apps</option>
                          <option value="Education">Education & Coaching</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Target City
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="e.g. Delhi NCR"
                          className="w-full h-11 bg-stone-50/70 border border-stone-200 rounded-xl px-3 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-teal-700"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Big Action Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 h-12 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-60 cursor-pointer active:scale-[0.99]"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Please wait...
                    </span>
                  ) : (
                    <>
                      <span>
                        {mode === 'login'
                          ? `Sign In as ${role === 'DRIVER' ? 'Auto Driver' : 'Ad Publisher'}`
                          : `Create ${role === 'DRIVER' ? 'Driver' : 'Publisher'} Account`}
                      </span>
                      <FaArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Quick Switch */}
              <div className="mt-5 pt-3 border-t border-stone-100 text-center text-xs text-stone-500">
                {mode === 'login' ? (
                  <span>
                    Don't have an account yet?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('signup');
                        setError('');
                      }}
                      className="font-bold text-teal-700 hover:underline cursor-pointer"
                    >
                      Sign Up here
                    </button>
                  </span>
                ) : (
                  <span>
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('login');
                        setError('');
                      }}
                      className="font-bold text-teal-700 hover:underline cursor-pointer"
                    >
                      Log In here
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-4 text-center text-xs text-stone-400 border-t border-stone-200/60 px-4">
        AdsWheeler Transit Network • Direct UPI Settlements • Free Wrap Installation
      </footer>
    </div>
  );
}
