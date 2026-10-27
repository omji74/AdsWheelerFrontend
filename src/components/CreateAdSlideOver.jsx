import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, IndianRupee, Layers, CheckCircle2 } from 'lucide-react';

export default function CreateAdSlideOver({ isOpen, onClose, onCreateAd, currentUser }) {
  const [formData, setFormData] = useState({
    title: '',
    business_name: currentUser?.profile?.business_name || currentUser?.name || '',
    description: '',
    price: '4000',
    target_vehicle_type: 'AUTO_RICKSHAW',
    duration: '1 Month',
    city: currentUser?.profile?.city || 'Delhi NCR'
  });
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        business_name:
          prev.business_name || currentUser.profile?.business_name || currentUser.name || '',
        city: prev.city || currentUser.profile?.city || 'Delhi NCR'
      }));
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    setLoading(true);
    try {
      await onCreateAd({
        publisher_id: currentUser?.id || 1,
        business_name:
          formData.business_name ||
          currentUser?.profile?.business_name ||
          currentUser?.name ||
          'Verified Brand',
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        target_vehicle_type: formData.target_vehicle_type,
        duration: formData.duration,
        city: formData.city,
        status: 'PUBLISHED'
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex sm:pl-10 w-full justify-end">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-full sm:w-screen sm:max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col justify-between h-full"
            >
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-stone-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900">
                    Post New Ad Campaign
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Deploy your brand on verified auto rickshaws
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 flex-1 overflow-y-auto">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Brand / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.business_name}
                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                    placeholder="e.g. Swiggy Instamart"
                    className="w-full h-11 bg-stone-50 border border-stone-200 rounded-xl px-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Campaign Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. 50% Off Opening Discount"
                    className="w-full h-11 bg-stone-50 border border-stone-200 rounded-xl px-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Vehicle Type
                    </label>
                    <select
                      value={formData.target_vehicle_type}
                      onChange={(e) =>
                        setFormData({ ...formData, target_vehicle_type: e.target.value })
                      }
                      className="w-full h-11 bg-stone-50 border border-stone-200 rounded-xl px-2.5 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-teal-700"
                    >
                      <option value="AUTO_RICKSHAW">Auto Rickshaw (CNG)</option>
                      <option value="E_RICKSHAW">E-Rickshaw (EV)</option>
                      <option value="BOTH">Universal (Both)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Monthly Driver Payout (₹) *
                    </label>
                    <div className="relative">
                      <IndianRupee className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="number"
                        required
                        min="1000"
                        step="100"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full h-11 bg-stone-50 border border-stone-200 rounded-xl pl-8 pr-3 text-sm text-stone-900 font-bold focus:outline-none focus:border-teal-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Duration
                    </label>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full h-11 bg-stone-50 border border-stone-200 rounded-xl px-2.5 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-teal-700"
                    >
                      <option value="1 Month">1 Month</option>
                      <option value="2 Months">2 Months</option>
                      <option value="3 Months">3 Months</option>
                      <option value="6 Months">6 Months</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Target City
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full h-11 bg-stone-50 border border-stone-200 rounded-xl px-2.5 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-teal-700"
                    >
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Pune">Pune</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Wrap Description & Guidelines
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Specify promotional message, target passenger routes, QR code offers..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                  />
                </div>
              </form>

              {/* Footer Actions */}
              <div className="p-4 sm:p-6 border-t border-stone-100 flex items-center justify-end gap-3 bg-stone-50/70">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-bold text-stone-600 hover:text-stone-900 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-98"
                >
                  {loading ? 'Publishing...' : 'Publish Campaign'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
