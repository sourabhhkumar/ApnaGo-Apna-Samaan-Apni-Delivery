import React from 'react';

export type LogoVariant = 'full-horizontal' | 'symbol' | 'app-icon' | 'flat-icon' | 'transparent';

interface ApnaGoLogoProps {
  variant?: LogoVariant;
  className?: string;
  size?: number;
  monochrome?: boolean;
}

/**
 * ApnaGo Official Vector Logo Component
 * Meets all 5 brand specifications:
 * 1. High-resolution square app icon
 * 2. Standalone logo symbol
 * 3. Horizontal logo with "ApnaGo"
 * 4. Simplified flat version for small sizes
 * 5. Transparent-background version for websites & splash screens
 */
export const ApnaGoLogo: React.FC<ApnaGoLogoProps> = ({
  variant = 'full-horizontal',
  className = '',
  size,
  monochrome = false,
}) => {
  // Brand color tokens
  const saffron = monochrome ? 'currentColor' : '#f97316';
  const saffronDark = monochrome ? 'currentColor' : '#ea580c';
  const saffronLight = monochrome ? 'currentColor' : '#fb923c';
  const green = monochrome ? 'currentColor' : '#15803d';
  const greenDark = monochrome ? 'currentColor' : '#166534';
  const navy = monochrome ? 'currentColor' : '#1e3a8a';
  const parcelColor = monochrome ? 'currentColor' : '#f97316';

  // 1. Standalone Symbol or Transparent Symbol
  const renderSymbol = (opts?: { showLandmarks?: boolean; showTrail?: boolean }) => (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Saffron gradient */}
        <linearGradient id="apna-saffron-grad" x1="20" y1="30" x2="120" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={saffronLight} />
          <stop offset="60%" stopColor={saffron} />
          <stop offset="100%" stopColor={saffronDark} />
        </linearGradient>

        {/* Green gradient */}
        <linearGradient id="apna-green-grad" x1="80" y1="50" x2="180" y2="170" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="60%" stopColor={green} />
          <stop offset="100%" stopColor={greenDark} />
        </linearGradient>

        {/* Trail gradient */}
        <linearGradient id="apna-trail-grad" x1="60" y1="160" x2="160" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.2" />
          <stop offset="80%" stopColor="#cbd5e1" stopOpacity="0.8" />
          <stop offset="100%" stopColor={saffron} stopOpacity="0.9" />
        </linearGradient>

        {/* Pin shadow */}
        <filter id="pin-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.25" />
        </filter>
        <filter id="box-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#0f172a" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Faint silhouettes of India Gate & Taj Mahal if requested */}
      {opts?.showLandmarks && (
        <g opacity="0.18" fill="#64748b">
          {/* India Gate (left bottom) */}
          <path d="M 22 188 L 22 174 L 26 174 L 26 166 L 24 166 L 24 163 L 42 163 L 42 166 L 40 166 L 40 174 L 44 174 L 44 188 L 38 188 L 38 178 C 38 174 28 174 28 178 L 28 188 Z" />
          {/* Taj Mahal (right bottom) */}
          <path d="M 160 188 L 160 180 L 163 180 L 163 188 L 165 188 L 165 178 L 167 178 L 167 174 L 171 174 L 171 171 Q 173 165 175 168 Q 177 165 179 171 L 179 174 L 183 174 L 183 178 L 185 178 L 185 188 L 187 188 L 187 180 L 190 180 L 190 188 Z" />
        </g>
      )}

      {/* Speed trail flowing to delivery parcel */}
      {opts?.showTrail !== false && (
        <g>
          <path
            d="M 68 152 C 90 168 130 164 148 146"
            stroke="url(#apna-trail-grad)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 85 160 C 105 172 135 168 150 152"
            stroke="url(#apna-trail-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
      )}

      {/* The Flowing Stylized Letter 'A' Ribbons */}
      {/* Right leg / curve (Green) */}
      <path
        d="M 100 32 C 118 32 144 54 152 86 C 160 118 162 146 165 162 C 152 164 136 158 132 142 C 126 122 120 95 106 82 C 96 72 82 74 72 80 C 86 52 92 32 100 32 Z"
        fill="url(#apna-green-grad)"
      />

      {/* Dynamic Swoosh Bridge connecting legs */}
      <path
        d="M 44 128 C 72 124 116 116 158 98 C 152 114 138 126 110 134 C 78 144 52 142 44 128 Z"
        fill="#15803d"
        opacity="0.9"
      />

      {/* Left leg / arch (Saffron Orange) */}
      <path
        d="M 100 32 C 84 32 60 52 48 84 C 36 116 32 148 35 164 C 48 164 62 152 68 134 C 74 114 84 86 100 74 C 112 64 122 66 128 72 C 118 48 110 32 100 32 Z"
        fill="url(#apna-saffron-grad)"
      />

      {/* Highlights & 3D bevel sheen */}
      <path
        d="M 98 34 C 85 36 65 54 54 84 C 47 104 43 124 41 142 C 40 132 44 110 52 86 C 62 58 82 40 98 34 Z"
        fill="#ffffff"
        opacity="0.35"
      />

      {/* Center Location Pin with Ashoka Chakra 24-spoke wheel */}
      <g filter="url(#pin-shadow)">
        {/* Pin body */}
        <path
          d="M 100 68 C 84 68 71 81 71 97 C 71 118 97 137 100 139 C 103 137 129 118 129 97 C 129 81 116 68 100 68 Z"
          fill="#ffffff"
        />
        {/* Pin outer navy ring */}
        <circle cx="100" cy="97" r="21" fill="none" stroke={navy} strokeWidth="2.5" />
        <circle cx="100" cy="97" r="19.5" fill="#ffffff" />

        {/* Ashoka Chakra 24 Spokes & Hub */}
        <circle cx="100" cy="97" r="4" fill={navy} />
        <circle cx="100" cy="97" r="17" fill="none" stroke={navy} strokeWidth="1" strokeDasharray="1.5,1.5" />

        {/* 24 radiating spokes */}
        {[...Array(24)].map((_, i) => {
          const angle = (i * 360) / 24;
          return (
            <line
              key={i}
              x1="100"
              y1="97"
              x2="100"
              y2="80"
              stroke={navy}
              strokeWidth="0.85"
              transform={`rotate(${angle} 100 97)`}
            />
          );
        })}
      </g>

      {/* Small 3D Orange Delivery Parcel Box */}
      <g filter="url(#box-shadow)" transform="translate(140, 126)">
        {/* Cube top face */}
        <polygon points="18,0 34,7 18,14 2,7" fill="#fb923c" />
        {/* Cube left face */}
        <polygon points="2,7 18,14 18,32 2,25" fill={saffron} />
        {/* Cube right face */}
        <polygon points="18,14 34,7 34,25 18,32" fill={saffronDark} />
        {/* Tape band */}
        <polygon points="16,1 20,3 20,13 16,11" fill="#fed7aa" opacity="0.9" />
        <polygon points="16,13 20,15 20,31 16,30" fill="#fed7aa" opacity="0.9" />
      </g>
    </svg>
  );

  // 2. Simplified Flat Icon (Highly legible for 24x24 / 48x48 / favicons)
  if (variant === 'flat-icon') {
    return (
      <svg
        viewBox="0 0 64 64"
        className={className}
        style={size ? { width: size, height: size } : undefined}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Clean flat background rounded square */}
        <rect width="64" height="64" rx="14" fill="#ffffff" />
        {/* Bold stylized A */}
        <path
          d="M 32 10 C 26 10 18 18 14 30 C 10 42 9 52 11 55 C 16 55 20 50 22 43 C 24 35 27 24 32 20 C 37 24 40 35 42 43 C 44 50 48 55 53 55 C 55 52 54 42 50 30 C 46 18 38 10 32 10 Z"
          fill={green}
        />
        <path
          d="M 32 10 C 26 10 18 18 14 30 C 10 42 9 52 11 55 C 15 55 19 49 21 42 C 24 30 28 20 32 20 C 34 20 37 22 39 25 C 36 17 34 10 32 10 Z"
          fill={saffron}
        />
        {/* Center Chakra Pin */}
        <circle cx="32" cy="32" r="8" fill="#ffffff" />
        <circle cx="32" cy="32" r="7" stroke={navy} strokeWidth="1.5" fill="#ffffff" />
        <circle cx="32" cy="32" r="2" fill={navy} />
        {[0, 45, 90, 135].map((ang) => (
          <line
            key={ang}
            x1="32"
            y1="26"
            x2="32"
            y2="38"
            stroke={navy}
            strokeWidth="0.8"
            transform={`rotate(${ang} 32 32)`}
          />
        ))}
        {/* Mini parcel badge */}
        <rect x="42" y="42" width="10" height="9" rx="1.5" fill={saffron} />
        <line x1="47" y1="42" x2="47" y2="51" stroke="#ffffff" strokeWidth="1.2" />
      </svg>
    );
  }

  // 3. High-resolution Square App Icon (512x512 canvas in rounded squircle)
  if (variant === 'app-icon') {
    return (
      <div
        className={`relative aspect-square rounded-[22%] bg-white shadow-xl overflow-hidden border border-slate-100 flex items-center justify-center ${className}`}
        style={size ? { width: size, height: size } : undefined}
      >
        {/* Soft radial backdrop glow */}
        <div className="absolute inset-0 bg-radial from-orange-50/40 via-white to-emerald-50/30 pointer-events-none" />

        {/* Scaled symbol with speed trail and faint landmark silhouettes */}
        <div className="relative w-[88%] h-[88%] flex items-center justify-center">
          {renderSymbol({ showLandmarks: true, showTrail: true })}
        </div>
      </div>
    );
  }

  // 4. Standalone Symbol
  if (variant === 'symbol') {
    return renderSymbol({ showLandmarks: false, showTrail: true });
  }

  // 5. Transparent version
  if (variant === 'transparent') {
    return renderSymbol({ showLandmarks: false, showTrail: true });
  }

  // Default: Full Horizontal Lockup with "ApnaGo" wordmark and arrow inside 'o'
  return (
    <div
      className={`inline-flex items-center gap-3 select-none ${className}`}
      style={size ? { height: size } : undefined}
    >
      {/* Symbol Left */}
      <div className="shrink-0 aspect-square w-10 h-10 sm:w-11 sm:h-11">
        {renderSymbol({ showLandmarks: false, showTrail: true })}
      </div>

      {/* Wordmark Right */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center tracking-tight font-black text-2xl sm:text-3xl">
          <span style={{ color: saffron }}>Apna</span>
          <span style={{ color: green }}>G</span>
          {/* Letter 'o' with integrated forward speed arrow */}
          <span className="relative inline-flex items-center justify-center">
            <span style={{ color: green }}>o</span>
            <svg
              className="absolute w-[42%] h-[42%] -top-[1px] right-[2px]"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 2 5 L 7 5 M 4.5 2.5 L 7 5 L 4.5 7.5"
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        {/* Tiny tricolour accent line */}
        <div className="flex h-0.5 w-full mt-1 rounded-full overflow-hidden opacity-90">
          <div className="flex-1 bg-orange-500" />
          <div className="w-1.5 bg-slate-200" />
          <div className="flex-1 bg-emerald-600" />
        </div>
      </div>
    </div>
  );
};
