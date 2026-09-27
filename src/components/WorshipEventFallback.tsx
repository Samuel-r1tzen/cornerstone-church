import React, { useState } from 'react';
import { Sparkles, Flame, Music } from 'lucide-react';

interface WorshipEventFallbackProps {
  size?: 'thumbnail' | 'card';
  className?: string;
}

/**
 * Beautiful vector artwork displayed for "Night of Worship & Prayer"
 * when an image is not available or fails to load.
 * Features stage lights, lifted hands in praise, and radiant amber prayer glow.
 */
export const WorshipEventFallback: React.FC<WorshipEventFallbackProps> = ({
  size = 'thumbnail',
  className = '',
}) => {
  if (size === 'thumbnail') {
    return (
      <div 
        className={`relative overflow-hidden bg-gradient-to-br from-[#0B0F1F] via-[#1E1430] to-[#FF6B2C]/30 border border-white/10 flex items-center justify-center select-none ${className}`}
        role="img"
        aria-label="Night of Worship & Prayer artwork"
      >
        {/* Amber Stage Light Rays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFAA40]/40 via-[#FF6B2C]/15 to-transparent pointer-events-none" />

        {/* Worship Scene Vector SVG */}
        <svg 
          viewBox="0 0 100 70" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="worshipRay" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFAA40" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#FF6B2C" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FF6B2C" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="worshipSilhouette" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#251A38" />
              <stop offset="100%" stopColor="#0B0E17" />
            </linearGradient>
          </defs>

          {/* Overhead Spotlight Cones */}
          <polygon points="50,0 20,70 80,70" fill="url(#worshipRay)" opacity="0.6" />
          <polygon points="25,0 0,70 50,70" fill="url(#worshipRay)" opacity="0.3" />
          <polygon points="75,0 50,70 100,70" fill="url(#worshipRay)" opacity="0.3" />

          {/* Soft Central Beacon (Presence of God) */}
          <circle cx="50" cy="22" r="10" fill="#FFAA40" opacity="0.5" filter="blur(1px)" />
          <circle cx="50" cy="22" r="4" fill="#FFFFFF" opacity="0.8" />

          {/* Simple Cross Accent in Light */}
          <line x1="50" y1="12" x2="50" y2="30" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.9" />
          <line x1="45" y1="17" x2="55" y2="17" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.9" />

          {/* Congregation Silhouette with Raised Hands */}
          <path 
            d="M 0,70 Q 15,62 25,65 Q 32,58 35,62 Q 40,54 44,56 Q 47,48 50,55 Q 53,49 56,56 Q 60,54 65,62 Q 70,58 75,65 Q 85,62 100,70 Z" 
            fill="url(#worshipSilhouette)" 
          />

          {/* Uplifted Hands Silhouettes */}
          {/* Left hand */}
          <path d="M 33,62 L 31,52 L 33,52 L 35,62 Z" fill="#2E2146" />
          {/* Center hands in adoration */}
          <path d="M 46,56 L 43,46 L 45,46 L 48,56 Z" fill="#3D295C" />
          <path d="M 52,56 L 55,46 L 57,46 L 54,56 Z" fill="#3D295C" />
          {/* Right hand */}
          <path d="M 67,62 L 69,52 L 71,52 L 69,62 Z" fill="#2E2146" />
        </svg>

        {/* Floating Sparks */}
        <div className="absolute top-1.5 left-2 w-1 h-1 bg-[#FFAA40] rounded-full animate-ping opacity-75" />
        <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-[#FF6B2C] rounded-full blur-[0.5px]" />

        {/* Small Bottom Tag */}
        <span className="absolute bottom-1 right-1.5 text-[8px] font-mono tracking-widest text-[#FF6B2C] uppercase bg-black/60 px-1 rounded">
          PRAISE
        </span>
      </div>
    );
  }

  // Card Size for Events Page
  return (
    <div 
      className={`relative overflow-hidden rounded-lg bg-gradient-to-br from-[#0B0F1F] via-[#1E1430] to-[#FF6B2C]/25 border border-white/10 flex items-center justify-center select-none p-6 ${className}`}
      role="img"
      aria-label="Night of Worship & Prayer artwork"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#FFAA40]/30 via-[#FF6B2C]/10 to-transparent pointer-events-none" />

      <div className="relative z-10 text-center space-y-2 max-w-xs">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#FF6B2C]/20 border border-[#FF6B2C]/40 flex items-center justify-center text-[#FF6B2C]">
          <Flame className="w-6 h-6 animate-pulse" />
        </div>
        <h4 className="font-display font-bold text-base text-white">
          Night of Worship & Prayer
        </h4>
        <p className="text-[11px] text-[#B0B7C3]">
          Extended praise, acoustic worship, and unhurried prayer encounter.
        </p>
      </div>
    </div>
  );
};

interface EventImageProps {
  src?: string;
  alt: string;
  className?: string;
  thumbnailClassName?: string;
  isWorshipEvent?: boolean;
}

/**
 * Image component that loads an event photo, and gracefully falls back 
 * to custom worship artwork if the URL is empty or fails to load.
 */
export const EventImageWithFallback: React.FC<EventImageProps> = ({
  src,
  alt,
  className = '',
  thumbnailClassName = 'w-24 h-16 object-cover rounded-sm hidden sm:block filter brightness-95 group-hover:brightness-105 transition-all',
  isWorshipEvent = false,
}) => {
  const [hasError, setHasError] = useState(false);

  // If no source provided or failed to load, display fallback
  if (!src || hasError) {
    return (
      <WorshipEventFallback 
        size="thumbnail" 
        className={`${thumbnailClassName} shrink-0`} 
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={thumbnailClassName}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
};
