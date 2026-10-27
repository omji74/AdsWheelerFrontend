import React from 'react';
import {
  Users,
  Plus,
  Trash2,
  IndianRupee,
  Layers,
  CheckCircle2,
  Clock,
  Phone,
  Car
} from 'lucide-react';

export default function AdvertiserPortal({
  ads = [],
  applications = [],
  onOpenCreateAd,
  onUpdateAppStatus,
  onDeleteAd,
  currentUser
}) {
  // Show campaigns belonging to this publisher (or all if not strictly scoped)
  const myAds = ads.filter(
    (a) => !currentUser?.id || String(a.publisher_id) === String(currentUser.id)
  );
  const displayAds = myAds.length > 0 ? myAds : ads;

  const displayAdIds = displayAds.map((a) => String(a.id));
  const myApplications = applications.filter(
    (app) => displayAdIds.includes(String(app.advertisement_id)) || !app.advertisement_id
  );

  const totalCampaigns = displayAds.length;
  const totalApplications = myApplications.length;
  const approvedDrivers = myApplications.filter(
    (a) => a.status === 'ACTIVE' || a.status === 'ACCEPTED'
  ).length;

  const publisherTitle =
    currentUser?.profile?.business_name || currentUser?.name || 'Verified Advertiser';
  const initials =
    publisherTitle
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'AD';

  const category = currentUser?.profile?.business_category || 'Commercial Brand';
  const city = currentUser?.profile?.city || 'Delhi NCR';

  return (
    <div className="space-y-5 my-6 sm:my-8">
      {/* 1. Brand Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal-50 border-2 border-teal-200 flex items-center justify-center font-extrabold text-teal-800 text-base sm:text-lg uppercase shadow-xs">
              {initials}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h3 className="text-base sm:text-lg font-bold text-stone-900 font-display">
                  {publisherTitle}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                  Verified Publisher
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Category: <span className="font-medium text-stone-700">{category}</span> • Serving:{' '}
                {city}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenCreateAd}
            className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>+ Launch New Ad Campaign</span>
          </button>
        </div>

        {/* 2. Key Telemetry Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <div className="bg-stone-50/80 p-3 sm:p-4 rounded-xl border border-stone-200/70">
            <span className="text-stone-500 text-xs font-semibold block mb-1">
              Active Campaigns
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display">
              {totalCampaigns}
            </span>
            <span className="text-[10px] text-stone-500 mt-0.5 block">Live in marketplace</span>
          </div>

          <div className="bg-stone-50/80 p-3 sm:p-4 rounded-xl border border-stone-200/70">
            <span className="text-stone-500 text-xs font-semibold block mb-1">
              Enrolled Drivers
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-teal-700 font-display">
              {approvedDrivers}
            </span>
            <span className="text-[10px] text-stone-500 mt-0.5 block">Autos on the road</span>
          </div>

          <div className="bg-stone-50/80 p-3 sm:p-4 rounded-xl border border-stone-200/70">
            <span className="text-stone-500 text-xs font-semibold block mb-1">
              Estimated Views
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display">
              {totalCampaigns * 140}k+
            </span>
            <span className="text-[10px] text-stone-500 mt-0.5 block">Street impressions/mo</span>
          </div>

          <div className="bg-stone-50/80 p-3 sm:p-4 rounded-xl border border-stone-200/70">
            <span className="text-stone-500 text-xs font-semibold block mb-1">
              Driver Applicants
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-amber-700 font-display">
              {totalApplications}
            </span>
            <span className="text-[10px] text-stone-500 mt-0.5 block">Ready for approval</span>
          </div>
        </div>
      </div>

      {/* 3. Driver Applications (Card-based on mobile, responsive list) */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200 shadow-xs">
        <div className="pb-3 border-b border-stone-100 mb-4">
          <h4 className="text-base font-bold text-stone-900 font-display">
            Driver Allocation & Approval Ledger ({myApplications.length})
          </h4>
          <p className="text-xs text-stone-500 mt-0.5">
            Review auto drivers who applied to your ads, approve installations, and disburse UPI settlements
          </p>
        </div>

        {myApplications.length === 0 ? (
          <div className="py-8 text-center space-y-2">
            <p className="text-xs text-stone-400">No driver applications pending yet.</p>
            <p className="text-[11px] text-stone-500">
              When drivers in your city accept your campaign, they will appear right here for approval.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {myApplications.map((app) => (
              <div
                key={app.id}
                className="bg-stone-50/80 hover:bg-stone-50 border border-stone-200/80 rounded-xl p-3.5 sm:p-4 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-500">
                        App #{app.id}
                      </span>
                      <h5 className="font-bold text-stone-900 text-sm">
                        {app.driver_name || 'Driver Applicant'}
                      </h5>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 pt-0.5">
                      <span className="flex items-center gap-1 font-medium text-stone-700">
                        <Phone className="w-3.5 h-3.5 text-stone-400" />
                        {app.driver_phone || 'Verified Mobile'}
                      </span>
                      <span className="text-stone-400">•</span>
                      <span>Target Ad: <strong className="text-stone-800">{app.ad_title}</strong></span>
                    </div>
                  </div>

                  {/* Payout, Statuses and Actions */}
                  <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-stone-200/60">
                    <div>
                      <span className="text-[10px] text-stone-400 block font-medium">Monthly Payout</span>
                      <div className="font-extrabold text-stone-900 text-sm flex items-center">
                        <IndianRupee className="w-3.5 h-3.5 text-teal-700" />
                        <span>{Number(app.amount).toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-400 block font-medium">Wrap Status</span>
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                          app.status === 'ACTIVE'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : app.status === 'ACCEPTED'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end pt-1 sm:pt-0">
                      {app.status === 'PENDING' && (
                        <button
                          onClick={() => onUpdateAppStatus(app.id, { status: 'ACCEPTED' })}
                          className="py-1.5 px-3 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          Approve Driver
                        </button>
                      )}
                      {app.status === 'ACCEPTED' && (
                        <button
                          onClick={() => onUpdateAppStatus(app.id, { status: 'ACTIVE' })}
                          className="py-1.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          Mark Wrap Active
                        </button>
                      )}
                      {app.payment_status === 'PENDING' && (
                        <button
                          onClick={() => onUpdateAppStatus(app.id, { payment_status: 'PAID' })}
                          className="py-1.5 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          Disburse UPI
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Posted Campaigns List */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-base font-bold text-stone-900 font-display">
              Your Published Campaigns ({displayAds.length})
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Live ads currently visible to auto drivers
            </p>
          </div>
          <button
            onClick={onOpenCreateAd}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Launch Another
          </button>
        </div>

        {displayAds.length === 0 ? (
          <div className="py-8 text-center space-y-3">
            <p className="text-sm font-bold text-stone-800">No campaigns launched yet</p>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Create your first campaign to invite auto and e-rickshaw drivers to wrap their vehicles with your brand.
            </p>
            <button
              onClick={onOpenCreateAd}
              className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              + Launch Your First Campaign
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {displayAds.map((ad) => (
              <div
                key={ad.id}
                className="bg-stone-50/80 p-4 rounded-xl border border-stone-200 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-white text-stone-700 border border-stone-200 font-semibold text-[11px]">
                      {ad.target_vehicle_type === 'AUTO_RICKSHAW'
                        ? 'Auto Rickshaw'
                        : ad.target_vehicle_type === 'E_RICKSHAW'
                        ? 'E-Rickshaw EV'
                        : 'Universal Fleet'}
                    </span>
                    <span className="font-extrabold text-stone-900 text-sm">
                      ₹{Number(ad.price).toLocaleString('en-IN')}/mo
                    </span>
                  </div>

                  <h5 className="font-bold text-stone-900 text-sm line-clamp-1">{ad.title}</h5>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {ad.description || 'Verified transit wrap promotion'}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                  <span>Duration: {ad.duration || '1 Month'}</span>
                  <button
                    onClick={() => onDeleteAd(ad.id)}
                    className="text-red-600 hover:text-red-700 font-bold flex items-center gap-1 text-xs cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
