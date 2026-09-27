import React from 'react';

export interface SocialLink {
  name: string;
  hoverColor: string;
  textGradient?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const YouTubeIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

export const TikTokIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={`${className} overflow-visible`} 
    aria-hidden="true"
  >
    {/* Cyan offset layer (-1.5px, -1px) */}
    <path 
      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.4a6.33 6.33 0 0 0-.86-.06A6.34 6.34 0 0 0 3.1 15.68a6.34 6.34 0 0 0 10.82 4.48c.4-.41.74-.88.99-1.39V9.93a8.16 8.16 0 0 0 4.68 1.48V7.96a4.83 4.83 0 0 1-.0-.0v-.0a4.8 4.8 0 0 1-.0-.0z"
      className="fill-[#25F4EE] opacity-0 group-hover:opacity-100 transition-all duration-200 transform -translate-x-[1.5px] -translate-y-[1px]"
    />
    {/* Magenta offset layer (+1.5px, +1px) */}
    <path 
      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.4a6.33 6.33 0 0 0-.86-.06A6.34 6.34 0 0 0 3.1 15.68a6.34 6.34 0 0 0 10.82 4.48c.4-.41.74-.88.99-1.39V9.93a8.16 8.16 0 0 0 4.68 1.48V7.96a4.83 4.83 0 0 1-.0-.0v-.0a4.8 4.8 0 0 1-.0-.0z"
      className="fill-[#FE2C55] opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-[1.5px] translate-y-[1px]"
    />
    {/* Main path */}
    <path 
      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.4a6.33 6.33 0 0 0-.86-.06A6.34 6.34 0 0 0 3.1 15.68a6.34 6.34 0 0 0 10.82 4.48c.4-.41.74-.88.99-1.39V9.93a8.16 8.16 0 0 0 4.68 1.48V7.96a4.83 4.83 0 0 1-.0-.0v-.0a4.8 4.8 0 0 1-.0-.0z"
      className="fill-current group-hover:fill-white transition-colors duration-200 relative z-10"
    />
  </svg>
);

export const SpotifyIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    aria-hidden="true"
  >
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

export const XIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export const SOCIAL_MEDIA_LINKS: SocialLink[] = [
  {
    name: 'YouTube',
    hoverColor: 'hover:text-[#FF0000] hover:border-[#FF0000]/50 hover:bg-[#FF0000]/10',
    icon: YouTubeIcon,
  },
  {
    name: 'Facebook',
    hoverColor: 'hover:text-[#1877F2] hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10',
    icon: FacebookIcon,
  },
  {
    name: 'Instagram',
    hoverColor: 'hover:text-[#E4405F] hover:border-[#E4405F]/50 hover:bg-[#E4405F]/10',
    icon: InstagramIcon,
  },
  {
    name: 'TikTok',
    // Dual colors: Electric Cyan (#25F4EE) & Neon Magenta (#FE2C55) simultaneously
    hoverColor: 'hover:text-white hover:border-transparent hover:shadow-[-2px_-2px_14px_rgba(37,244,238,0.55),2px_2px_14px_rgba(254,44,85,0.55)] hover:bg-gradient-to-r hover:from-[#25F4EE]/20 hover:via-[#080B12]/80 hover:to-[#FE2C55]/20',
    textGradient: 'group-hover:bg-gradient-to-r group-hover:from-[#25F4EE] group-hover:to-[#FE2C55] group-hover:bg-clip-text group-hover:text-transparent group-hover:font-bold',
    icon: TikTokIcon,
  },
  {
    name: 'Spotify',
    hoverColor: 'hover:text-[#1ED760] hover:border-[#1ED760]/50 hover:bg-[#1ED760]/10',
    icon: SpotifyIcon,
  },
  {
    name: 'X',
    hoverColor: 'hover:text-white hover:border-white/50 hover:bg-white/10',
    icon: XIcon,
  },
];

interface SocialLinksProps {
  variant?: 'badges' | 'icons' | 'minimal';
  className?: string;
  iconClassName?: string;
  showLabels?: boolean;
}

export const SocialMediaRow: React.FC<SocialLinksProps> = ({
  variant = 'badges',
  className = '',
  iconClassName = 'w-4 h-4',
  showLabels = false,
}) => {
  return (
    <div className={`flex items-center flex-wrap gap-2.5 ${className}`}>
      {SOCIAL_MEDIA_LINKS.map((item) => {
        const Icon = item.icon;
        
        if (variant === 'badges') {
          return (
            <span
              key={item.name}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-sm bg-[#080B12] border border-white/10 text-[#B0B7C3] transition-all duration-300 ${item.hoverColor} group cursor-default`}
            >
              <Icon className={`${iconClassName} transition-colors group-hover:scale-110`} />
              {showLabels && (
                <span className={`text-xs font-semibold tracking-wider font-display transition-colors ${item.textGradient || 'group-hover:text-white'}`}>
                  {item.name}
                </span>
              )}
            </span>
          );
        }

        if (variant === 'minimal') {
          return (
            <span
              key={item.name}
              className={`text-[#B0B7C3] transition-colors p-1.5 group ${item.hoverColor} cursor-default`}
            >
              <Icon className={iconClassName} />
            </span>
          );
        }

        // Default 'icons' circular/square buttons
        return (
          <span
            key={item.name}
            className={`w-9 h-9 rounded-sm flex items-center justify-center bg-white/5 border border-white/10 text-[#B0B7C3] transition-all duration-200 group ${item.hoverColor} cursor-default`}
          >
            <Icon className={iconClassName} />
          </span>
        );
      })}
    </div>
  );
};
