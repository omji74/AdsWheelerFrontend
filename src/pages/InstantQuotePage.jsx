import React from 'react';
import InstantQuotation from '../components/InstantQuotation';
import { useCampaign } from '../context/CampaignContext';

export default function InstantQuotePage() {
  const { quotePreFill } = useCampaign();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
          BrandOnAuto Dynamic Pricing
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-stone-900 font-display tracking-tight mt-2">
          Instant Quotation Engine
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Calculate cost estimates for Full Hood Wraps, Back Panels, and Digital LED displays across Indian metro fleets.
        </p>
      </div>

      <InstantQuotation initialConfig={quotePreFill} />
    </div>
  );
}
