import React from 'react';
import { useNavigate } from 'react-router-dom';
import EarningsCalculator from '../components/EarningsCalculator';
import StatsSection from '../components/StatsSection';

export default function EarningsPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          Driver Financial Independence
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-stone-900 font-display tracking-tight mt-2">
          Guaranteed Monthly Driver Earnings
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Calculate how much guaranteed passive income you can earn every month by wrapping your Auto Rickshaw or E-Rickshaw.
        </p>
      </div>

      <EarningsCalculator onApplyClick={() => navigate('/marketplace')} />

      <StatsSection />
    </div>
  );
}
