import React from 'react';
import {
  FaIndianRupeeSign,
  FaBullhorn,
  FaShieldHalved,
  FaLocationDot,
  FaBolt,
  FaRegClock,
  FaCheck,
  FaBuilding,
  FaCarSide,
  FaArrowRight,
  FaMoneyBillWave,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaUser,
  FaUserTie,
  FaCircleCheck,
  FaTruckFast,
  FaArrowTrendUp,
  FaQrcode,
  FaRegEye,
  FaRegEyeSlash,
  FaWrench,
  FaRoute,
  FaAward,
  FaSliders,
  FaLayerGroup,
  FaCircleQuestion,
  FaUserCheck,
  FaStore,
  FaGasPump,
  FaCalendarDays,
  FaWhatsapp,
  FaCamera,
  FaWandMagicSparkles,
  FaMapLocationDot,
  FaChartLine,
  FaFileInvoiceDollar,
  FaMobileScreen,
  FaShareNodes,
  FaDownload,
  FaArrowsRotate,
  FaTv
} from 'react-icons/fa6';
import {
  RiMegaphoneFill,
  RiShieldCheckFill,
  RiCoinFill,
  RiQrCodeFill,
  RiRoadMapFill,
  RiSpeedUpFill,
  RiCarWashingFill
} from 'react-icons/ri';

/**
 * Flaticon UIcons Component (from flaticon.com)
 * Uses official Flaticon CSS font classes:
 * - style="rr" -> Regular Rounded (fi fi-rr-[name])
 * - style="sr" -> Solid Rounded (fi fi-sr-[name])
 * - style="br" -> Bold Rounded (fi fi-br-[name])
 * - style="brands" -> Brands (fi fi-brands-[name])
 */
export function Flaticon({ name, style = 'sr', className = '', ...props }) {
  const prefix = style === 'brands' ? 'fi-brands' : `fi-${style}`;
  return (
    <i
      className={`fi ${prefix}-${name} inline-flex items-center justify-center leading-none ${className}`}
      {...props}
    />
  );
}

/**
 * Rich Flaticon-style Auto Rickshaw Vector Badge
 * High fidelity colorful illustration of Bajaj CNG Auto Rickshaw
 */
export function AutoRickshawBadge({ size = 48, className = '' }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 drop-shadow-md select-none ${className}`}
    >
      <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="cngHood" x1="10" y1="14" x2="62" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="0.6" stopColor="#D97706" />
            <stop offset="1" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="cngBody" x1="8" y1="36" x2="64" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#059669" />
            <stop offset="0.7" stopColor="#047857" />
            <stop offset="1" stopColor="#065F46" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="18" y1="20" x2="36" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E0F2FE" stopOpacity="0.9" />
            <stop offset="1" stopColor="#BAE6FD" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="wheelGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#374151" />
            <stop offset="1" stopColor="#111827" />
          </linearGradient>
        </defs>

        {/* Shadow */}
        <ellipse cx="36" cy="65" rx="28" ry="4.5" fill="#000000" fillOpacity="0.16" />

        {/* Rear Wheel */}
        <circle cx="53" cy="54" r="9" fill="url(#wheelGrad)" />
        <circle cx="53" cy="54" r="4.5" fill="#9CA3AF" />
        <circle cx="53" cy="54" r="2" fill="#111827" />

        {/* Front Wheel */}
        <circle cx="17" cy="54" r="9" fill="url(#wheelGrad)" />
        <circle cx="17" cy="54" r="4.5" fill="#9CA3AF" />
        <circle cx="17" cy="54" r="2" fill="#111827" />

        {/* Rickshaw Lower Green Body */}
        <path
          d="M10 42C10 38 14 36 22 36H56C61 36 64 39 64 44L63 54C63 56 61 58 59 58H14C11.5 58 10 56 10 54V42Z"
          fill="url(#cngBody)"
        />

        {/* Rickshaw Yellow Canopy Hood */}
        <path
          d="M16 36L22 17C23 15 25 14 28 14H48C54 14 60 17 62 23L64 36H16Z"
          fill="url(#cngHood)"
        />

        {/* Windshield */}
        <path
          d="M23 18L18 34H33V18H23Z"
          fill="url(#glassGrad)"
          stroke="#F59E0B"
          strokeWidth="1.2"
        />

        {/* Passenger Cabin Opening */}
        <rect x="36" y="20" width="22" height="15" rx="3" fill="#1E293B" fillOpacity="0.85" />
        {/* Passenger Seat Leather */}
        <rect x="44" y="28" width="12" height="6" rx="2" fill="#9A3412" />

        {/* Headlight Glow */}
        <path d="M10 44L7 45.5C6 46 6 47.5 7 48L10 49.5V44Z" fill="#FEF08A" />
        <circle cx="10" cy="47" r="2.5" fill="#FDE047" />

        {/* Yellow Side Accent Stripe */}
        <rect x="14" y="44" width="46" height="3" rx="1.5" fill="#FDE047" fillOpacity="0.9" />

        {/* Front Fender & Handlebars */}
        <path d="M12 51C12 46 16 46 19 49" stroke="#E5E7EB" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1="28" x2="25" y2="33" stroke="#4B5563" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/**
 * Rich Flaticon-style Megaphone / Publisher Badge
 * Vibrant 3D styled bullhorn with dynamic sound broadcast waves
 */
export function PublisherMegaphoneBadge({ size = 48, className = '' }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 drop-shadow-md select-none ${className}`}
    >
      <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="megaBody" x1="14" y1="24" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6" />
            <stop offset="0.6" stopColor="#1D4ED8" />
            <stop offset="1" stopColor="#1E40AF" />
          </linearGradient>
          <linearGradient id="megaRim" x1="44" y1="14" x2="56" y2="46" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="megaHandle" x1="24" y1="36" x2="28" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4B5563" />
            <stop offset="1" stopColor="#1F2937" />
          </linearGradient>
        </defs>

        {/* Shadow */}
        <ellipse cx="36" cy="65" rx="26" ry="4" fill="#000000" fillOpacity="0.14" />

        {/* Handle */}
        <path
          d="M25 38L21 54C20.5 56 22 58 24 58H28C30 58 31 56 30.5 54L28 38"
          fill="url(#megaHandle)"
        />

        {/* Main Megaphone Cone */}
        <path
          d="M17 31C15 31 14 32.5 14 34.5V37.5C14 39.5 15 41 17 41L46 51V21L17 31Z"
          fill="url(#megaBody)"
        />

        {/* Front Ring (Mouthpiece flare) */}
        <ellipse cx="46" cy="36" rx="5" ry="15" fill="url(#megaRim)" />
        <ellipse cx="46.5" cy="36" rx="2.5" ry="11" fill="#78350F" />

        {/* Sound Waves */}
        <path
          d="M56 26C59 29 61 32 61 36C61 40 59 43 56 46"
          stroke="#F59E0B"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M62 20C66 25 68 30 68 36C68 42 66 47 62 52"
          stroke="#3B82F6"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />

        {/* Accent Sparkle */}
        <circle cx="24" cy="22" r="3" fill="#FDE047" />
      </svg>
    </div>
  );
}

/**
 * Rich Flaticon Golden Rupee Payout Badge
 */
export function RupeePayoutBadge({ size = 36, className = '' }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 drop-shadow-sm select-none ${className}`}
    >
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="coinGold" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE047" />
            <stop offset="0.45" stopColor="#EAB308" />
            <stop offset="1" stopColor="#CA8A04" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="21" fill="url(#coinGold)" />
        <circle cx="24" cy="24" r="18" stroke="#FEF08A" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="24" cy="24" r="16" fill="#D97706" />
        <path
          d="M17 15H31M17 19H31M17 23H27C29 23 30.5 21.5 30.5 19.5M21 23L30 33"
          stroke="#FEF08A"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/**
 * Rich Flaticon Emerald Verified Shield Badge
 */
export function VerifiedShieldBadge({ size = 36, className = '' }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 drop-shadow-sm select-none ${className}`}
    >
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="shieldGrad" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10B981" />
            <stop offset="0.7" stopColor="#059669" />
            <stop offset="1" stopColor="#047857" />
          </linearGradient>
        </defs>
        <path
          d="M24 4L9 10V22C9 32.5 15.5 41 24 44C32.5 41 39 32.5 39 22V10L24 4Z"
          fill="url(#shieldGrad)"
        />
        <path
          d="M24 8L13 12.5V22C13 30.5 18 37.5 24 40C30 37.5 35 30.5 35 22V12.5L24 8Z"
          stroke="#6EE7B7"
          strokeWidth="1.2"
        />
        <path
          d="M18 23L22 27L30 19"
          stroke="#FFFFFF"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/**
 * Rich Flaticon Target Route / Transit GPS Badge
 */
export function TargetRouteBadge({ size = 36, className = '' }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 drop-shadow-sm select-none ${className}`}
    >
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="routePinGrad" x1="12" y1="6" x2="36" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366F1" />
            <stop offset="1" stopColor="#4338CA" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="40" rx="14" ry="3.5" fill="#000000" fillOpacity="0.15" />
        <path
          d="M24 6C16.8 6 11 11.8 11 19C11 29 24 42 24 42C24 42 37 29 37 19C37 11.8 31.2 6 24 6Z"
          fill="url(#routePinGrad)"
        />
        <circle cx="24" cy="19" r="6" fill="#FFFFFF" />
        <circle cx="24" cy="19" r="3" fill="#6366F1" />
      </svg>
    </div>
  );
}

/**
 * Rich Flaticon UPI Payment Badge
 */
export function UpiPaymentBadge({ size = 36, className = '' }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 drop-shadow-sm select-none ${className}`}
    >
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="48" height="48" rx="12" fill="#0F766E" />
        <path d="M12 28L20 16H28L20 28H12Z" fill="#14B8A6" />
        <path d="M22 32L30 20H36L28 32H22Z" fill="#F59E0B" />
        <circle cx="24" cy="24" r="2.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

/**
 * Rich Flaticon E-Rickshaw Electric Vehicle Badge
 */
export function ElectricTotoBadge({ size = 48, className = '' }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 drop-shadow-md select-none ${className}`}
    >
      <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="evHood" x1="16" y1="12" x2="60" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#06B6D4" />
            <stop offset="1" stopColor="#0891B2" />
          </linearGradient>
          <linearGradient id="evBody" x1="12" y1="36" x2="64" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0D9488" />
            <stop offset="1" stopColor="#115E59" />
          </linearGradient>
        </defs>
        <ellipse cx="36" cy="65" rx="26" ry="4" fill="#000000" fillOpacity="0.15" />
        <circle cx="53" cy="54" r="9" fill="#1F2937" />
        <circle cx="53" cy="54" r="4.5" fill="#67E8F9" />
        <circle cx="17" cy="54" r="9" fill="#1F2937" />
        <circle cx="17" cy="54" r="4.5" fill="#67E8F9" />

        {/* Body */}
        <path
          d="M12 40C12 37 15 35 20 35H58C62 35 64 38 64 42L63 53C63 55 61 57 59 57H15C13 57 12 55 12 53V40Z"
          fill="url(#evBody)"
        />

        {/* Roof */}
        <rect x="18" y="14" width="44" height="6" rx="3" fill="url(#evHood)" />
        {/* Support Rods */}
        <line x1="22" y1="20" x2="22" y2="35" stroke="#94A3B8" strokeWidth="2.5" />
        <line x1="42" y1="20" x2="42" y2="35" stroke="#94A3B8" strokeWidth="2.5" />
        <line x1="60" y1="20" x2="60" y2="35" stroke="#94A3B8" strokeWidth="2.5" />

        {/* Electric Bolt Emblem */}
        <path
          d="M34 40L30 46H35L33 52L39 45H34L36 40H34Z"
          fill="#FACC15"
          stroke="#CA8A04"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
}

// Re-export Font Awesome 6 icons so other components have easy, consistent access
export {
  FaIndianRupeeSign,
  FaBullhorn,
  FaShieldHalved,
  FaLocationDot,
  FaBolt,
  FaRegClock,
  FaCheck,
  FaBuilding,
  FaCarSide,
  FaArrowRight,
  FaMoneyBillWave,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaUser,
  FaUserTie,
  FaCircleCheck,
  FaTruckFast,
  FaArrowTrendUp,
  FaQrcode,
  FaRegEye,
  FaRegEyeSlash,
  FaWrench,
  FaRoute,
  FaAward,
  FaSliders,
  FaLayerGroup,
  FaCircleQuestion,
  FaUserCheck,
  FaStore,
  FaGasPump,
  FaCalendarDays,
  FaWhatsapp,
  FaCamera,
  FaWandMagicSparkles,
  FaMapLocationDot,
  FaChartLine,
  FaFileInvoiceDollar,
  FaMobileScreen,
  FaShareNodes,
  FaDownload,
  FaArrowsRotate,
  FaTv,
  RiMegaphoneFill,
  RiShieldCheckFill,
  RiCoinFill,
  RiQrCodeFill,
  RiRoadMapFill,
  RiSpeedUpFill,
  RiCarWashingFill
};
