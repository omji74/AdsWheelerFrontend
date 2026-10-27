import React from 'react';
import {
  Flaticon,
  AutoRickshawBadge,
  ElectricTotoBadge,
  RupeePayoutBadge,
  VerifiedShieldBadge,
  UpiPaymentBadge,
  FaIndianRupeeSign,
  FaArrowRight,
  FaShieldHalved,
  FaRegClock,
  FaCalendarDays
} from './RichIcons';

export default function DriverPortal({ applications = [], onBrowseMore, currentUser }) {
  // Only show applications belonging to this driver
  const myApplications = applications.filter(
    (a) => !currentUser?.id || String(a.driver_id) === String(currentUser.id)
  );

  const totalEarned = myApplications
    .filter((a) => a.payment_status === 'PAID')
    .reduce((sum, a) => sum + Number(a.amount || 0), 0);

  const pendingAmount = myApplications
    .filter((a) => a.payment_status === 'PENDING')
    .reduce((sum, a) => sum + Number(a.amount || 0), 0);

  const activeCount = myApplications.filter((a) => a.status === 'ACTIVE').length;

  const vehicleName =
    currentUser?.profile?.vehicle_type === 'E_RICKSHAW'
      ? 'E-Rickshaw (Electric EV)'
      : 'Auto Rickshaw (CNG)';

  const isEv = currentUser?.profile?.vehicle_type === 'E_RICKSHAW';
  const regNumber = currentUser?.profile?.vehicle_registration_number || 'Transit Registered';
  const routeCity = currentUser?.profile?.city || 'Delhi NCR Route';

  return (
    <div className="space-y-5 my-6 sm:my-8">
      {/* 1. Driver Profile & Welcome Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-50/80 border-2 border-teal-200/80 flex items-center justify-center shrink-0 shadow-xs">
              {isEv ? <ElectricTotoBadge size={40} /> : <AutoRickshawBadge size={40} />}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-stone-900 font-display">
                  {currentUser?.name || 'Transit Partner Driver'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                  <VerifiedShieldBadge size={14} /> Verified Driver
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Chassis: <span className="font-semibold text-stone-800">{vehicleName}</span> •{' '}
                <span className="font-bold text-stone-900">{regNumber}</span> • {routeCity}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onBrowseMore}
            className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer active:scale-98"
          >
            <span>+ Accept New Campaigns</span>
            <FaArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* 2. Key Metrics with Rich Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4">
          <div className="bg-stone-50/80 hover:bg-stone-50/90 p-4 rounded-xl border border-stone-200/80 flex items-center justify-between gap-3 transition-colors">
            <div>
              <span className="text-stone-500 text-xs font-semibold block mb-1">
                Total Payouts Credited
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display">
                  ₹{totalEarned.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  UPI Paid
                </span>
              </div>
              <span className="text-[11px] text-stone-500 mt-1 block">
                Direct monthly bank credit
              </span>
            </div>
            <RupeePayoutBadge size={38} />
          </div>

          <div className="bg-stone-50/80 hover:bg-stone-50/90 p-4 rounded-xl border border-stone-200/80 flex items-center justify-between gap-3 transition-colors">
            <div>
              <span className="text-stone-500 text-xs font-semibold block mb-1">
                Active Vehicle Wraps
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold text-teal-700 font-display">
                  {activeCount}
                </span>
                <span className="text-xs text-stone-500 font-medium">Autos on road</span>
              </div>
              <span className="text-[11px] text-stone-500 mt-1 block">
                Earning regular monthly cash
              </span>
            </div>
            {isEv ? <ElectricTotoBadge size={38} /> : <AutoRickshawBadge size={38} />}
          </div>

          <div className="bg-stone-50/80 hover:bg-stone-50/90 p-4 rounded-xl border border-stone-200/80 flex items-center justify-between gap-3 transition-colors">
            <div>
              <span className="text-stone-500 text-xs font-semibold block mb-1">
                Pending Next Payout
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display">
                  ₹{pendingAmount.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-amber-700 font-bold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                  Next Cycle
                </span>
              </div>
              <span className="text-[11px] text-stone-500 mt-1 block">
                Credited on 1st of month
              </span>
            </div>
            <UpiPaymentBadge size={38} />
          </div>
        </div>
      </div>

      {/* 3. My Applied Ad Campaigns (Mobile-Optimized Cards) */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200 shadow-xs">
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-stone-100 mb-4">
          <div>
            <h4 className="text-base font-bold text-stone-900 font-display">
              My Accepted Campaigns ({myApplications.length})
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Track your wrap contract status and monthly UPI payouts
            </p>
          </div>
        </div>

        {myApplications.length === 0 ? (
          <div className="py-8 sm:py-10 text-center space-y-2.5">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto shadow-xs border border-teal-100">
              <AutoRickshawBadge size={44} />
            </div>
            <p className="text-sm font-bold text-stone-900">No campaigns accepted yet</p>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Scroll down to explore open brand campaigns and tap "Accept Campaign" to start earning.
            </p>
            <button
              onClick={onBrowseMore}
              className="mt-2 text-xs font-bold text-teal-700 hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              <span>Browse Open Campaigns Below</span>
              <FaArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {myApplications.map((app) => (
              <div
                key={app.id}
                className="bg-stone-50/80 hover:bg-stone-50 border border-stone-200/80 rounded-xl p-3.5 sm:p-4 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-500">
                        #{app.id}
                      </span>
                      <h5 className="font-bold text-stone-900 text-sm sm:text-base">
                        {app.ad_title || 'Transit Wrap Campaign'}
                      </h5>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 pt-0.5">
                      <span className="flex items-center gap-1.5">
                        <FaRegClock className="w-3 h-3 text-stone-400" />
                        Applied: {new Date(Number(app.accepted_at)).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Flaticon name="calendar" style="rr" className="text-xs text-stone-400" />
                        Term: 30 Days Active
                      </span>
                    </div>
                  </div>

                  {/* Payout & Status Badges */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200/60">
                    <div>
                      <span className="text-[10px] text-stone-400 block font-medium">Monthly Payout</span>
                      <div className="font-extrabold text-stone-900 text-sm sm:text-base flex items-center">
                        <FaIndianRupeeSign className="w-3.5 h-3.5 text-teal-700 mr-0.5" />
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

                    <div>
                      <span className="text-[10px] text-stone-400 block font-medium">UPI Settlement</span>
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                          app.payment_status === 'PAID'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        {app.payment_status === 'PAID' ? '✓ Paid' : '⏳ Processing'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
