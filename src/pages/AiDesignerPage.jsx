import React from 'react';
import { useNavigate } from 'react-router-dom';
import AIAdDesigner from '../components/AIAdDesigner';
import { useCampaign } from '../context/CampaignContext';

export default function AiDesignerPage() {
  const navigate = useNavigate();
  const { applyCreativeToQuotation } = useCampaign();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-800 border border-purple-200">
          Daylight AI Studio
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-stone-900 font-display tracking-tight mt-2">
          AI Auto Rickshaw Wrap Designer
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Generate realistic transit ad mockups on Bajaj CNG Autos and E-Rickshaws using AI. Directly apply designs to quotation.
        </p>
      </div>

      <AIAdDesigner
        onApplyToQuotation={(cfg) => {
          applyCreativeToQuotation(cfg);
          navigate('/instant-quote');
        }}
      />
    </div>
  );
}
