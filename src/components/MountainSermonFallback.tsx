import React, { useState } from 'react';
import { Mountain, Play, Sparkles } from 'lucide-react';

interface MountainSermonFallbackProps {
  size?: 'thumbnail' | 'card' | 'hero';
  className?: string;
  showPlayIcon?: boolean;
}

/**
 * Beautiful, stylized vector artwork displayed when there isn't an image 
 * at "Faith That Moves Mountains" (or if the sermon image fails to load).
 * Features dual mountain silhouettes, radiant sunrise rays, and Mark 11:23 scripture accent.
 */
export const MountainSermonFallback: React.FC<MountainSermonFallbackProps> = ({
  size = 'thumbnail',
  className = '',
  showPlayIcon = true
}) => {
  if (size === 'thumbnail') {
    return (
      <div 
        className={`relative overflow-hidden bg-gradient-to-br from-[#121626] via-[#1D1832] to-[#FF6B2C]/25 border border-white/10 flex items-center justify-center select-none group-hover:border-[#FF6B2C]/50 transition-colors ${className}`}
        role="img"
        aria-label="Faith That Moves Mountains illustration (Mark 11:23)"
      >
        {/* Subtle background glow */}
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#FF6B2C]/20 rounded-full blur-md pointer-events-none" />
        
        {/* Mountain Silhouette SVG */}
        <svg 
          viewBox="0 0 100 80" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="thumbSunGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFAA40" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF6B2C" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="thumbBackPeak" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#312E57" />
              <stop offset="100%" stopColor="#18172E" />
            </linearGradient>
            <linearGradient id="thumbFrontPeak" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A3469" />
              <stop offset="100%" stopColor="#1E1938" />
            </linearGradient>
          </defs>

          {/* Golden Dawn Sun / Horizon */}
          <circle cx="50" cy="38" r="14" fill="url(#thumbSunGlow)" opacity="0.6" />
          
          {/* Distant Peak */}
          <polygon points="15,80 44,28 72,80" fill="url(#thumbBackPeak)" opacity="0.85" />
          <polyline points="44,28 58,80" stroke="#FF824D" strokeWidth="1.2" opacity="0.4" />

          {/* Near Mighty Mountain Peak */}
          <polygon points="32,80 65,20 98,80" fill="url(#thumbFrontPeak)" />
          {/* Light ridge on mountain edge */}
          <polyline points="65,20 78,80" stroke="#FFAA40" strokeWidth="1.4" opacity="0.7" />
          
          {/* Subtle base fog */}
          <rect x="0" y="68" width="100" height="12" fill="#0A0F1F" opacity="0.7" />
        </svg>

        {/* Center overlay badge with Mountain icon or Play icon */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-black/60 backdrop-blur-xs border border-white/20 flex items-center justify-center text-[#FF6B2C] shadow-sm group-hover:scale-110 group-hover:bg-[#FF6B2C] group-hover:text-[#080B12] transition-all">
            {showPlayIcon ? (
              <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
            ) : (
              <Mountain className="w-3 h-3" />
            )}
          </div>
          <span className="text-[7.5px] font-mono tracking-widest text-[#FF6B2C] uppercase font-bold mt-0.5 drop-shadow-sm">
            MK 11:23
          </span>
        </div>
      </div>
    );
  }

  // Card or Hero Size
  return (
    <div 
      className={`relative overflow-hidden bg-gradient-to-br from-[#0F1424] via-[#1B1630] to-[#2B1B2A] border border-white/10 flex flex-col items-center justify-center p-8 select-none ${className}`}
      role="img"
      aria-label="Faith That Moves Mountains illustration (Mark 11:22-24)"
    >
      {/* Radiant atmospheric background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-b from-[#FF6B2C]/25 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 inset-x-0 h-40 bg-gradient-to-t from-[#080B12] to-transparent pointer-events-none" />

      {/* SVG Mountain Range with Sun, Light Rays & Ridge Lines */}
      <svg 
        viewBox="0 0 600 360" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-80"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="cardSun" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FFAA40" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FF6B2C" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF6B2C" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cardMountain1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3A3463" />
            <stop offset="100%" stopColor="#14192B" />
          </linearGradient>
          <linearGradient id="cardMountain2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#553A73" />
            <stop offset="100%" stopColor="#1A1835" />
          </linearGradient>
        </defs>

        {/* Dawn Halo */}
        <circle cx="300" cy="180" r="90" fill="url(#cardSun)" />

        {/* Back Mountain Silhouette */}
        <polygon points="50,360 220,130 380,360" fill="url(#cardMountain1)" opacity="0.75" />
        <polyline points="220,130 280,360" stroke="#FFAA40" strokeWidth="1.5" opacity="0.35" />

        {/* Mighty Central Mountain Peak */}
        <polygon points="160,360 330,95 510,360" fill="url(#cardMountain2)" />
        <polyline points="330,95 385,360" stroke="#FF824D" strokeWidth="2.5" opacity="0.65" />
        
        {/* Foreground Foothills */}
        <polygon points="0,360 110,240 260,360" fill="#121626" opacity="0.9" />
        <polygon points="380,360 480,250 600,360" fill="#0E1220" opacity="0.95" />
      </svg>

      {/* Foreground Content */}
      <div className="relative z-10 text-center max-w-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B2C]/20 border border-[#FF6B2C]/40 text-[#FF6B2C] text-xs font-mono uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mark 11:22–24 · Unshakable Faith</span>
        </div>

        <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight drop-shadow-md">
          FAITH THAT MOVES <span className="text-[#FF6B2C]">MOUNTAINS</span>
        </h3>

        <p className="text-xs sm:text-sm text-[#F5F2EE]/80 font-normal leading-relaxed italic max-w-md mx-auto">
          &ldquo;Truly I tell you, if anyone says to this mountain, &lsquo;Go, throw yourself into the sea,&rsquo; and does not doubt in their heart but believes... it will be done.&rdquo;
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <span className="text-xs text-[#B0B7C3]">Ps. Sarah van Wyk</span>
          <span className="w-1 h-1 rounded-full bg-[#FF6B2C]" />
          <span className="text-xs text-[#FF6B2C] font-mono">Cornerstone Sunday Archive</span>
        </div>
      </div>
    </div>
  );
};

interface SermonImageItemProps {
  src?: string | null;
  alt: string;
  title: string;
  className?: string;
  thumbnailClassName?: string;
  forceFallback?: boolean;
}

/**
 * Smart image component that automatically renders MountainSermonFallback 
 * whenever there isn't an image (or if image fails/errors) for "Faith That Moves Mountains".
 */
export const SermonImageWithFallback: React.FC<SermonImageItemProps> = ({
  src,
  alt,
  title,
  className = '',
  thumbnailClassName = 'w-16 h-14 rounded-sm shrink-0',
  forceFallback = false
}) => {
  const [hasError, setHasError] = useState(false);
  const isMountainSermon = title.toLowerCase().includes('mountain');

  // If there isn't an image (null, empty string, forceFallback, or image error)
  if (!src || hasError || forceFallback) {
    if (isMountainSermon) {
      return (
        <MountainSermonFallback 
          size="thumbnail" 
          className={thumbnailClassName} 
        />
      );
    }

    // Generic sermon fallback if other sermon has no image
    return (
      <div className={`bg-[#0E1325] border border-white/10 flex flex-col items-center justify-center text-[#FF6B2C] ${thumbnailClassName}`}>
        <Play className="w-4 h-4 fill-current ml-0.5" />
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt || title} 
      className={className || thumbnailClassName}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
};
