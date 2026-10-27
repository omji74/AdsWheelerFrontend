import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flaticon,
  FaCarSide,
  FaBullhorn,
  FaArrowRight,
  FaRoute,
  FaUserTie
} from './RichIcons';
import {
  Bell,
  Globe,
  LogOut,
  Car,
  LayoutDashboard,
  Plus,
  Calculator,
  UserCheck
} from 'lucide-react';

export default function Navbar({
  currentRole,
  onRoleChange,
  backendOnline,
  notifications = [],
  onMarkNotificationRead,
  onOpenCreateAd,
  currentUser,
  onOpenAuth,
  onLogout
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read_status).length;

  const roles = React.useMemo(() => {
    if (!currentUser) {
      return [{ id: 'PUBLIC', label: 'Marketplace', flaticon: 'compass' }];
    }
    if (currentUser.role === 'DRIVER') {
      return [
        { id: 'DRIVER', label: 'Driver Hub', flaticon: 'car' },
        { id: 'PUBLIC', label: 'Browse Campaigns', flaticon: 'compass' }
      ];
    }
    if (currentUser.role === 'PUBLISHER') {
      return [
        { id: 'PUBLISHER', label: 'Advertiser Hub', flaticon: 'megaphone' },
        { id: 'PUBLIC', label: 'Fleet Preview', flaticon: 'compass' }
      ];
    }
    return [{ id: 'PUBLIC', label: 'Marketplace', flaticon: 'compass' }];
  }, [currentUser]);

  return (
    <>
      {/* Top Main Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-stone-200/90 bg-[#FAF9F6]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo & Name */}
          <div
            onClick={() => {
              if (currentUser?.role === 'DRIVER') onRoleChange('DRIVER');
              else if (currentUser?.role === 'PUBLISHER') onRoleChange('PUBLISHER');
              else onRoleChange('PUBLIC');
            }}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-xl bg-teal-700 flex items-center justify-center text-white shadow-xs">
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
          </div>

          {/* Desktop Navigation Tabs (Hidden on mobile) */}
          <nav className="hidden md:flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200/60">
            {roles.map((role) => {
              const isActive = currentRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => onRoleChange(role.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Flaticon
                    name={role.flaticon}
                    style="sr"
                    className={`text-sm ${isActive ? 'text-teal-700' : 'text-stone-400'}`}
                  />
                  <span>{role.label}</span>
                </button>
              );
            })}

            {/* Quick Feature Jumpers */}
            <div className="h-4 w-[1px] bg-stone-300 mx-1" />

            <button
              onClick={() => {
                const el = document.getElementById('instant-quotation');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else onRoleChange('PUBLIC');
              }}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-stone-600 hover:text-teal-800 hover:bg-white/80 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Flaticon name="calculator" style="rr" className="text-xs text-teal-700" />
              <span>Instant Quote</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('ai-ad-designer');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else onRoleChange('PUBLIC');
              }}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-stone-600 hover:text-purple-800 hover:bg-white/80 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Flaticon name="magic-wand" style="sr" className="text-xs text-purple-600" />
              <span>AI Designer</span>
            </button>
          </nav>

          {/* Right Action Stack */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Publisher Quick Post Button */}
            {currentUser?.role === 'PUBLISHER' && (
              <button
                onClick={onOpenCreateAd}
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
                      {notifications.length === 0 ? (
                        <p className="text-xs text-stone-400 text-center py-4">No alerts yet.</p>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => onMarkNotificationRead(n.id)}
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
                <div className="flex items-center gap-1.5 p-1 sm:pl-1.5 sm:pr-2.5 rounded-lg bg-white border border-stone-200 shadow-xs">
                  <div className="w-6 h-6 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-xs font-bold text-teal-800 uppercase">
                    {currentUser.name ? currentUser.name.substring(0, 1) : 'U'}
                  </div>
                  <div className="hidden sm:block text-left text-xs">
                    <span className="font-bold text-stone-900 block leading-tight truncate max-w-[90px]">
                      {currentUser.name?.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-teal-700 font-bold block leading-tight">
                      {currentUser.role === 'DRIVER' ? 'Driver' : 'Publisher'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  title="Log out"
                  className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                >
                  <Flaticon name="sign-out-alt" style="rr" className="text-sm" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <FaUserTie className="w-3 h-3 text-white/90" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Modern Mobile Bottom Navigation Bar (Fixed for quick thumb-reach) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {currentUser?.role === 'DRIVER' && (
          <>
            <button
              onClick={() => onRoleChange('DRIVER')}
              className={`flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                currentRole === 'DRIVER' ? 'text-teal-700' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <Flaticon name="car" style="sr" className="text-base mb-0.5" />
              <span>My Contracts</span>
            </button>
            <button
              onClick={() => onRoleChange('PUBLIC')}
              className={`flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                currentRole === 'PUBLIC' ? 'text-teal-700' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <Flaticon name="compass" style="rr" className="text-base mb-0.5" />
              <span>Browse Ads</span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('earnings-calc');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else onRoleChange('DRIVER');
              }}
              className="flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-bold text-stone-400 hover:text-stone-600 transition-all cursor-pointer"
            >
              <Flaticon name="calculator" style="rr" className="text-base mb-0.5" />
              <span>Earnings</span>
            </button>
          </>
        )}

        {currentUser?.role === 'PUBLISHER' && (
          <>
            <button
              onClick={() => onRoleChange('PUBLISHER')}
              className={`flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                currentRole === 'PUBLISHER' ? 'text-teal-700' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <Flaticon name="megaphone" style="sr" className="text-base mb-0.5" />
              <span>My Campaigns</span>
            </button>
            <button
              onClick={onOpenCreateAd}
              className="flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-bold text-teal-700 transition-all cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center mb-0.5 shadow-xs">
                <FaBullhorn className="w-3.5 h-3.5 text-white" />
              </div>
              <span>Post Ad</span>
            </button>
            <button
              onClick={() => onRoleChange('PUBLIC')}
              className={`flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                currentRole === 'PUBLIC' ? 'text-teal-700' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <Flaticon name="compass" style="rr" className="text-base mb-0.5" />
              <span>Fleet Preview</span>
            </button>
          </>
        )}

        {!currentUser && (
          <>
            <button
              onClick={() => onRoleChange('PUBLIC')}
              className="flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-bold text-teal-700 cursor-pointer"
            >
              <Flaticon name="compass" style="rr" className="text-base mb-0.5" />
              <span>Marketplace</span>
            </button>
            <button
              onClick={() => onOpenAuth('login', 'DRIVER')}
              className="flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-bold text-stone-600 cursor-pointer"
            >
              <Flaticon name="car" style="sr" className="text-base mb-0.5 text-amber-600" />
              <span>Driver Sign In</span>
            </button>
            <button
              onClick={() => onOpenAuth('login', 'PUBLISHER')}
              className="flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-bold text-stone-600 cursor-pointer"
            >
              <Flaticon name="megaphone" style="sr" className="text-base mb-0.5 text-teal-600" />
              <span>Publisher Sign In</span>
            </button>
          </>
        )}
      </nav>
    </>
  );
}
