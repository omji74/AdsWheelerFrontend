import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppWidget from './WhatsAppWidget';
import CreateAdSlideOver from './CreateAdSlideOver';
import AuthModal from './AuthModal';
import ScrollToTop from './ScrollToTop';
import { useAuth } from '../context/AuthContext';
import { useCampaign } from '../context/CampaignContext';

export default function Layout() {
  const { currentUser, guestMode, setGuestMode, setCurrentUser } = useAuth();
  const {
    toast,
    isCreateSlideOverOpen,
    setIsCreateSlideOverOpen,
    createCampaign,
    authModalState,
    closeAuthModal
  } = useCampaign();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1C1917] font-['Plus_Jakarta_Sans',sans-serif] relative">
      <ScrollToTop />

      {/* Friendly Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-6 right-6 z-50 pointer-events-none"
          >
            <div className="px-4 py-3 rounded-xl bg-stone-900 text-white shadow-xl text-xs font-medium flex items-center gap-2.5">
              {toast.type === 'info' ? (
                <Info className="w-4 h-4 text-stone-300" />
              ) : (
                <Check className="w-4 h-4 text-emerald-400" />
              )}
              <span>{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guest Mode Alert Banner */}
      {!currentUser && guestMode && (
        <div className="bg-amber-50 border-b border-amber-200/80 px-3 sm:px-4 py-2.5 text-xs text-amber-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 max-w-7xl mx-auto w-full">
            <span className="flex items-center gap-1.5 font-medium leading-tight">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
              Viewing as Guest. Sign in as Driver to accept campaigns, or as Publisher to post campaigns.
            </span>
            <Link
              to="/login"
              className="self-start sm:self-auto px-3 py-1 bg-amber-700 text-white rounded-lg font-bold text-[11px] hover:bg-amber-800 transition-colors cursor-pointer shrink-0"
            >
              Sign In / Sign Up
            </Link>
          </div>
        </div>
      )}

      {/* Modern Responsive Navbar */}
      <Navbar />

      {/* Dynamic Page Outlet */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 pb-24 md:pb-12">
        <Outlet />
      </main>

      {/* Publisher Slide-Over for Campaign Creation */}
      <CreateAdSlideOver
        isOpen={isCreateSlideOverOpen}
        onClose={() => setIsCreateSlideOverOpen(false)}
        onCreateAd={createCampaign}
        currentUser={currentUser}
      />

      {/* Quick Auth Modal (for inline triggers) */}
      <AuthModal
        isOpen={authModalState.isOpen}
        onClose={closeAuthModal}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          setGuestMode(false);
          closeAuthModal();
        }}
        initialMode={authModalState.mode}
        initialRole={authModalState.role}
      />

      {/* Floating BrandOnAuto WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Footer */}
      <Footer />
    </div>
  );
}
