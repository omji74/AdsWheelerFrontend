import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaArrowRight, FaBolt, AutoRickshawBadge } from './RichIcons';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const sendWhatsApp = (text) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/918057417617?text=${encoded}`, '_blank');
  };

  const handleQuickQuestion = (q) => {
    sendWhatsApp(q);
  };

  const handleSubmitCustom = (e) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    sendWhatsApp(customMsg);
    setCustomMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="mb-3 w-80 sm:w-92 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#075E54] p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <FaWhatsapp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-display">AdsWheeler WhatsApp Desk</h4>
                    <span className="text-[10px] text-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                      Fleet Managers Online
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white text-xs font-bold"
                >
                  ✕
                </button>
              </div>
              <p className="text-[11px] text-white/90 mt-2 leading-relaxed">
                Hi! Need an instant rate card or want to check auto fleet availability in your city? Choose a quick question below:
              </p>
            </div>

            {/* Quick Questions */}
            <div className="p-3.5 space-y-2 bg-stone-50 text-xs">
              {[
                '🛺 Need instant quotation for 50 auto rickshaws',
                '📍 Check route availability in Delhi / Mumbai / Bengaluru',
                '📺 Inquire about Rear Digital LED Display rates',
                '🤝 I am an Auto Driver & want to register my vehicle'
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(q)}
                  className="w-full text-left p-2.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-[11px] font-medium text-stone-800 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span className="truncate pr-2">{q}</span>
                  <FaArrowRight className="w-3 h-3 text-stone-300 group-hover:text-emerald-600 shrink-0" />
                </button>
              ))}

              {/* Custom Message Input */}
              <form onSubmit={handleSubmitCustom} className="pt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white transition-colors cursor-pointer"
                >
                  <FaArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-13 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer font-bold text-xs"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-5 h-5 text-white" />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
        <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
      </button>
    </div>
  );
}
