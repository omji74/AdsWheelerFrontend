import React from 'react';
import { Link } from 'react-router-dom';
import { AutoRickshawBadge } from '../components/RichIcons';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-20 h-20 rounded-3xl bg-teal-50 border border-teal-200 flex items-center justify-center mb-6 shadow-sm">
        <AutoRickshawBadge size={54} />
      </div>

      <span className="text-xs font-mono font-bold bg-stone-100 text-stone-600 px-3 py-1 rounded-full mb-3 border border-stone-200">
        404 Route Not Found
      </span>

      <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-display tracking-tight mb-2">
        Off-Route Auto Turn!
      </h1>

      <p className="text-sm text-stone-500 max-w-md mx-auto mb-8">
        The page you are looking for doesn't exist or has taken an alternative detour through transit corridors.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-xs"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/marketplace"
          className="px-5 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-xs flex items-center gap-2 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Marketplace</span>
        </Link>
      </div>
    </div>
  );
}
