import React from 'react';

interface CornerstoneLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const CornerstoneLogo: React.FC<CornerstoneLogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md',
  showSubtitle = true,
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }[size];

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  }[size];

  const subtitleSizes = {
    sm: 'text-[9px] tracking-[0.16em]',
    md: 'text-[10px] tracking-[0.18em]',
    lg: 'text-xs tracking-[0.2em]',
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Precision Geometric Cornerstone Mark */}
      <div 
        className={`${iconDimensions} flex-shrink-0 relative flex items-center justify-center rounded-sm bg-gradient-to-br from-[#121829] to-[#0A0E1A] border border-white/10 p-1.5 shadow-md shadow-black/40 group-hover:border-[#FF6B2C]/40 group-hover:shadow-[#FF6B2C]/20 transition-all duration-300`}
        aria-hidden="true"
      >
        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform group-hover:scale-105 transition-transform duration-300"
        >
          <defs>
            <linearGradient id="csLogoOrange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FF824D" />
              <stop offset="100%" stop-color="#FF6B2C" />
            </linearGradient>
            <linearGradient id="csLogoWhite" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="100%" stop-color="#E2E8F0" />
            </linearGradient>
            <linearGradient id="csLogoSlate" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#94A3B8" />
              <stop offset="100%" stop-color="#475569" />
            </linearGradient>
          </defs>

          {/* Top Face of Cornerstone */}
          <path d="M24 6 L40 15 L24 24 L8 15 Z" fill="url(#csLogoWhite)" opacity="0.95" />
          
          {/* Left Angled Facet (Vibrant Warm Cornerstone Accent) */}
          <path d="M8 15 L24 24 L24 42 L8 33 Z" fill="url(#csLogoOrange)" />
          
          {/* Right Angled Facet (Deep Structured Foundation) */}
          <path d="M24 24 L40 15 L40 33 L24 42 Z" fill="url(#csLogoSlate)" opacity="0.85" />
          
          {/* Structural Cross Centerlines */}
          <path d="M24 11 L24 37" stroke="#080B12" strokeWidth="1.75" strokeLinecap="round" opacity="0.75" />
          <path d="M14 18 L34 18" stroke="#080B12" strokeWidth="1.75" strokeLinecap="round" opacity="0.75" />
          <circle cx="24" cy="18" r="2" fill="#FF6B2C" />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <span className={`font-display font-extrabold ${titleSizes} tracking-wider text-[#F5F2EE] block group-hover:text-[#FF6B2C] transition-colors leading-tight`}>
            CORNERSTONE
          </span>
          {showSubtitle && (
            <span className={`${subtitleSizes} uppercase text-[#B0B7C3] block font-medium mt-0.5 whitespace-nowrap`}>
              Built on Christ, Open to Everyone
            </span>
          )}
        </div>
      )}
    </div>
  );
};
