import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flaticon,
  FaCarSide,
  FaBullhorn,
  FaArrowRight,
  FaUserTie,
  AutoRickshawBadge,
  ElectricTotoBadge
} from './RichIcons';
import {
  Bell,
  LogOut,
  User,
  Plus,
  Compass,
  CreditCard,
  Calculator,
  Sparkles,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCampaign } from '../context/CampaignContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logout, isDriver, isPublisher } = useAuth();
  const {
    notifications,
    markNotificationRead,
    setIsCreateSlideOverOpen,
    openAuthModal,
    backendOnline
  } = useCampaign();

  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = (notifications || []).filter((n) => !n.read_status).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Top Main Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-stone-200/90 bg-[#FAF9F6]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo & Name */}
          <Link
            to={
              isDriver
                ? '/driver/dashboard'
                : isPublisher
                ? '/advertiser/dashboard'
                : '/'
            }
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-8 h-8 rounded-xl bg-teal-700 flex items-center justify-center text-white shadow-xs group-hover:bg-teal-800 transition-colors">
              <Flaticon name="car" style="sr" className="text-base text-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-stone-900 tracking-tight font-display">
                AdsWheeler
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                Transit
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center bg-stone-100/90 p-1 rounded-xl border border-stone-200/60">
            {isDriver ? (
              <>
                <NavLink
                  to="/driver/dashboard"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`
                  }
                >
                  <Flaticon name="car" style="sr" className="text-xs text-teal-700" />
                  <span>My Contracts</span>
                </NavLink>

                <NavLink
                  to="/driver/profile"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`
                  }
                >
                  <User className="w-3.5 h-3.5 text-teal-700" />
                  <span>Driver Profile</span>
                </NavLink>

                <NavLink
                  to="/marketplace"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`
                  }
                >
                  <Compass className="w-3.5 h-3.5 text-stone-400" />
                  <span>Browse Ads</span>
                </NavLink>

                <NavLink
                  to="/earnings"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`
                  }
                >
                  <Calculator className="w-3.5 h-3.5 text-stone-400" />
                  <span>Earnings Calc</span>
                </NavLink>
              </>
            ) : isPublisher ? (
              <>
                <NavLink
                  to="/advertiser/dashboard"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`
                  }
                >
                  <Flaticon name="megaphone" style="sr" className="text-xs text-teal-700" />
                  <span>Advertiser Hub</span>
                </NavLink>

                <NavLink
                  to="/marketplace"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`
                  }
                >
                  <Compass className="w-3.5 h-3.5 text-stone-400" />
                  <span>Marketplace</span>
                </NavLink>

                <NavLink
                  to="/instant-quote"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`
                  }
                >
                  <Calculator className="w-3.5 h-3.5 text-stone-400" />
                  <span>Instant Quote</span>
                </NavLink>

                <NavLink
                  to="/ai-designer"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`
                  }
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>AI Designer</span>
                </NavLink>

                <NavLink
                  to="/fleet"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`
                  }
                >
                  <Layers className="w-3.5 h-3.5 text-stone-400" />
                  <span>Fleet & 3D</span>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`
                  }
                >
                  <span>Home</span>
                </NavLink>

                <NavLink
                  to="/marketplace"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`
                  }
                >
                  <Compass className="w-3.5 h-3.5 text-teal-700" />
                  <span>Marketplace</span>
                </NavLink>

                <NavLink
                  to="/instant-quote"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`
                  }
                >
                  <Calculator className="w-3.5 h-3.5 text-stone-400" />
                  <span>Instant Quote</span>
                </NavLink>

                <NavLink
                  to="/ai-designer"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`
                  }
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>AI Designer</span>
                </NavLink>

                <NavLink
                  to="/packages"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`
                  }
                >
                  <span>Packages</span>
                </NavLink>

                <NavLink
                  to="/fleet"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`
                  }
                >
                  <span>Fleet</span>
                </NavLink>
              </>
            )}
          </nav>

          {/* Right Action Stack */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Publisher Quick Post Button */}
            {isPublisher && (
              <button
                onClick={() => setIsCreateSlideOverOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer active:scale-95"
              >
                <FaBullhorn className="w-3 h-3" />
                <span className="hidden xs:inline sm:inline">Post Ad</span>
              </button>
            )}

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg bg-white hover:bg-stone-50 text-stone-600 border border-stone-200 shadow-xs transition-colors relative cursor-pointer"
                aria-label="Toggle notifications"
              >
                <Flaticon name="bell" style="rr" className="text-sm" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-700" />
                )}
              </button>

              {/* Notification Drawer */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-76 sm:w-88 bg-white rounded-xl border border-stone-200 shadow-xl p-3.5 z-50"
                  >
                    <div className="flex items-center justify-between pb-2.5 border-b border-stone-100 mb-2.5">
                      <span className="text-xs font-bold text-stone-900">Notifications</span>
                      <span className="text-[11px] text-stone-500 font-medium">
                        {unreadCount} unread
                      </span>
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {(notifications || []).length === 0 ? (
                        <p className="text-xs text-stone-400 text-center py-4">No alerts yet.</p>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => markNotificationRead(n.id)}
                            className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                              n.read_status
                                ? 'bg-stone-50 border-stone-100 text-stone-500'
                                : 'bg-teal-50/50 border-teal-200 text-stone-800'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-stone-900">{n.title}</span>
                              {!n.read_status && (
                                <span className="w-1.5 h-1.5 rounded-full bg-teal-700" />
                              )}
                            </div>
                            <p className="text-[11px] text-stone-600 leading-normal">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile / Logout */}
            {currentUser ? (
              <div className="flex items-center gap-1 sm:gap-2 pl-1 border-l border-stone-200">
                <Link
                  to={isDriver ? '/driver/profile' : '/advertiser/dashboard'}
                  className="flex items-center gap-1.5 p-1 sm:pl-1.5 sm:pr-2.5 rounded-lg bg-white hover:bg-stone-50 border border-stone-200 shadow-xs transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-xs font-bold text-teal-800 uppercase">
                    {currentUser.name ? currentUser.name.substring(0, 1) : 'U'}
                  </div>
                  <div className="hidden sm:block text-left text-xs">
                    <span className="font-bold text-stone-900 block leading-tight truncate max-w-[90px]">
                      {currentUser.name?.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-teal-700 font-bold block leading-tight">
                      {isDriver ? 'Driver' : 'Publisher'}
                    </span>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  title="Log out"
                  className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                >
                  <Flaticon name="sign-out-alt" style="rr" className="text-sm" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <FaUserTie className="w-3 h-3 text-white/90" />
                  <span>Sign In</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {isDriver && (
          <>
            <NavLink
              to="/driver/dashboard"
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-bold transition-all ${
                  isActive ? 'text-teal-700' : 'text-stone-400'
                }`
              }
            >
              <Flaticon name="car" style="sr" className="text-base mb-0.5" />
              <span>Contracts</span>
            </NavLink>

            <NavLink
              to="/driver/profile"
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-bold transition-all ${
                  isActive ? 'text-teal-700' : 'text-stone-400'
                }`
              }
            >
              <User className="w-4 h-4 mb-0.5" />
              <span>Profile</span>
            </NavLink>

            <NavLink
              to="/marketplace"
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-bold transition-all ${
                  isActive ? 'text-teal-700' : 'text-stone-400'
                }`
              }
            >
              <Compass className="w-4 h-4 mb-0.5" />
              <span>Browse Ads</span>
            </NavLink>

            <NavLink
              to="/earnings"
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-bold transition-all ${
                  isActive ? 'text-teal-700' : 'text-stone-400'
                }`
              }
            >
              <Calculator className="w-4 h-4 mb-0.5" />
              <span>Earnings</span>
            </NavLink>
          </>
        )}

        {isPublisher && (
          <>
            <NavLink
              to="/advertiser/dashboard"
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-bold transition-all ${
                  isActive ? 'text-teal-700' : 'text-stone-400'
                }`
              }
            >
              <Flaticon name="megaphone" style="sr" className="text-base mb-0.5" />
              <span>Campaigns</span>
            </NavLink>

            <button
              onClick={() => setIsCreateSlideOverOpen(true)}
              className="flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-bold text-teal-700"
            >
              <div className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center mb-0.5 shadow-xs">
                <FaBullhorn className="w-3 h-3 text-white" />
              </div>
              <span>Post Ad</span>
            </button>

            <NavLink
              to="/marketplace"
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-bold transition-all ${
                  isActive ? 'text-teal-700' : 'text-stone-400'
                }`
              }
            >
              <Compass className="w-4 h-4 mb-0.5" />
              <span>Marketplace</span>
            </NavLink>

            <NavLink
              to="/fleet"
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-bold transition-all ${
                  isActive ? 'text-teal-700' : 'text-stone-400'
                }`
              }
            >
              <Layers className="w-4 h-4 mb-0.5" />
              <span>Fleet 3D</span>
            </NavLink>
          </>
        )}

        {!currentUser && (
          <>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
                  isActive ? 'text-teal-700' : 'text-stone-400'
                }`
              }
            >
              <Flaticon name="compass" style="rr" className="text-base mb-0.5" />
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/marketplace"
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
                  isActive ? 'text-teal-700' : 'text-stone-400'
                }`
              }
            >
              <Compass className="w-4 h-4 mb-0.5" />
              <span>Marketplace</span>
            </NavLink>

            <Link
              to="/auth?role=DRIVER&mode=login"
              className="flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold text-stone-600"
            >
              <Flaticon name="car" style="sr" className="text-base mb-0.5 text-amber-600" />
              <span>Driver</span>
            </Link>

            <Link
              to="/auth?role=PUBLISHER&mode=login"
              className="flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold text-stone-600"
            >
              <Flaticon name="megaphone" style="sr" className="text-base mb-0.5 text-teal-600" />
              <span>Publisher</span>
            </Link>
          </>
        )}
      </nav>
    </>
  );
}
