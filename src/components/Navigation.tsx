import React, { useState, useEffect, useRef } from 'react';
import { PageId, CursorOrigin } from '../types';
import { Calendar, X } from 'lucide-react';
import { SocialMediaRow } from './SocialIcons';
import { CornerstoneLogo } from './CornerstoneLogo';

interface NavigationProps {
  activePage: PageId;
  onNavigate: (page: PageId, fromMenu?: boolean) => void;
  onOpenPlanVisit: () => void;
  isTransitioning?: boolean;
}

interface NavItem {
  id: PageId;
  num: string;
  label: string;
  mediaUrl: string;
  anchor?: string;
}

const MENU_ITEMS: NavItem[] = [
  {
    id: 'home',
    num: '01',
    label: 'HOME',
    mediaUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1920&q=85',
    anchor: '#hero'
  },
  {
    id: 'watch-worship',
    num: '02',
    label: 'WATCH & WORSHIP',
    mediaUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=85',
    anchor: '#watch'
  },
  {
    id: 'story',
    num: '03',
    label: 'OUR STORY',
    mediaUrl: 'https://images.pexels.com/photos/2111015/pexels-photo-2111015.jpeg?auto=compress&cs=tinysrgb&w=1920',
    anchor: '#story'
  },
  {
    id: 'ministries',
    num: '04',
    label: 'MINISTRIES',
    mediaUrl: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1920',
    anchor: '#ministries'
  },
  {
    id: 'visit',
    num: '05',
    label: 'PLAN A VISIT',
    mediaUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1920',
    anchor: '#join'
  },
  {
    id: 'events',
    num: '06',
    label: 'EVENTS',
    mediaUrl: 'https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg?auto=compress&cs=tinysrgb&w=1920',
    anchor: '#events'
  },
  {
    id: 'contact',
    num: '07',
    label: 'CONTACT',
    mediaUrl: 'https://images.pexels.com/photos/1181712/pexels-photo-1181712.jpeg?auto=compress&cs=tinysrgb&w=1920',
    anchor: '#contact'
  },
];

export const Navigation: React.FC<NavigationProps> = ({ 
  activePage, 
  onNavigate, 
  onOpenPlanVisit,
  isTransitioning = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNavKey, setActiveNavKey] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveNavKey(activePage);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, activePage]);

  // Escape key closes menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Handle hamburger menu item selection (closes menu and triggers slow page appearance)
  const handleSelect = (item: NavItem) => {
    if (isTransitioning) return;

    // Smoothly close the hamburger menu
    setIsOpen(false);

    // Trigger slow and smooth appearance of the selected page
    onNavigate(item.id, true);
  };

  const desktopNavLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'watch-worship', label: 'Watch & Worship' },
    { id: 'story', label: 'Our Story' },
    { id: 'visit', label: 'Plan A Visit' },
    { id: 'ministries', label: 'Ministries' },
    { id: 'events', label: 'Events' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top Floating / Sticky Header Bar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${
          isScrolled 
            ? 'bg-[#080B12]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl' 
            : 'bg-gradient-to-b from-[#080B12]/90 via-[#080B12]/50 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Church Name */}
          <button 
            onClick={() => {
              setIsOpen(false);
              onNavigate('home');
            }} 
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] rounded-sm text-left cursor-pointer"
            aria-label="Cornerstone Church Home - Built on Christ, Open to Everyone"
          >
            <CornerstoneLogo />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {desktopNavLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer relative ${
                    isActive
                      ? 'text-[#FF6B2C]'
                      : 'text-[#B0B7C3] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#FF6B2C] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Center & Hamburger */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenPlanVisit}
              className="hidden sm:inline-flex bg-[#FF6B2C] hover:bg-[#FF824D] text-[#080B12] font-semibold text-xs px-4 py-2.5 rounded-sm transition-all duration-200 transform hover:scale-[1.02] shadow-md shadow-[#FF6B2C]/20 items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Plan Your Visit</span>
            </button>

            {/* Hamburger Trigger Button */}
            <button
              id="hamburger"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className={`w-11 h-11 rounded-full flex flex-col items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer z-50 ${
                isOpen 
                  ? 'bg-[#FF6B2C]/20 text-[#FF6B2C]' 
                  : 'hover:bg-white/10 text-white bg-white/5 border border-white/10'
              }`}
            >
              {isOpen ? (
                <X className="w-5 h-5 stroke-[2]" />
              ) : (
                <>
                  <span className="w-5 h-[1.5px] bg-current transition-all duration-300"></span>
                  <span className="w-3.5 h-[1.5px] bg-current transition-all duration-300 ml-1.5"></span>
                  <span className="w-5 h-[1.5px] bg-current transition-all duration-300"></span>
                </>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* ============================================================
          FULLSCREEN MENU with layered background media
          Layer 1: Dynamic Ken Burns Background Media
          Layer 2: Vignette & Gradient Overlay
          Layer 3: Menu Typography & Info Content
         ============================================================ */}
      <div 
        id="menu-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
        className={`fixed inset-0 z-40 bg-[#0A0F1F] transition-opacity duration-400 ease-out overflow-hidden ${
          isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        {/* LAYER 1: Dynamic background media with Ken Burns drift */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {MENU_ITEMS.map((item) => {
            const isActive = activeNavKey === item.id;
            return (
              <img
                key={item.id}
                src={item.mediaUrl}
                alt=""
                aria-hidden="true"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform ${
                  isActive 
                    ? 'opacity-100 scale-[1.04] ken-burns-idle filter brightness-[0.45] saturate-[0.85]' 
                    : 'opacity-0 scale-[1.12]'
                }`}
                loading="eager"
              />
            );
          })}
        </div>

        {/* LAYER 2: Dark Vignette Gradient Overlay */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `
              linear-gradient(180deg, rgba(8, 11, 18, 0.86) 0%, rgba(8, 11, 18, 0.6) 40%, rgba(8, 11, 18, 0.9) 100%),
              radial-gradient(ellipse at 35% 50%, rgba(8, 11, 18, 0.25) 0%, rgba(8, 11, 18, 0.88) 85%)
            `
          }}
        />

        {/* LAYER 3: Menu Content */}
        <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-24 sm:py-28 flex flex-col justify-between overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center my-auto">
            
            {/* Left Column: Staggered Large Links */}
            <div className="lg:col-span-7">
              <span className="text-[11px] font-display tracking-[0.25em] uppercase text-[#FF6B2C] block mb-4">
                Explore Cornerstone
              </span>

              <nav>
                <ul className="flex flex-col gap-1.5 sm:gap-2">
                  {MENU_ITEMS.map((item, idx) => {
                    const isCurrent = activeNavKey === item.id;
                    return (
                      <li 
                        key={item.id}
                        style={{
                          transitionDelay: isOpen ? `${0.08 + idx * 0.05}s` : '0s'
                        }}
                        className={`transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                      >
                        <button
                          onClick={() => handleSelect(item)}
                          disabled={isTransitioning}
                          onMouseEnter={() => setActiveNavKey(item.id)}
                          onFocus={() => setActiveNavKey(item.id)}
                          className={`font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight inline-flex items-center gap-4 py-1.5 transition-all duration-300 relative cursor-pointer group text-left ${
                            isCurrent
                              ? 'text-white translate-x-2.5'
                              : 'text-[#B0B7C3]/75 hover:text-white hover:translate-x-2.5'
                          }`}
                        >
                          <span className={`text-xs sm:text-sm font-semibold tracking-widest transition-colors ${
                            isCurrent ? 'text-[#FF6B2C]' : 'text-[#B0B7C3]/50 group-hover:text-[#FF6B2C]'
                          }`}>
                            {item.num}
                          </span>
                          
                          <span>{item.label}</span>

                          <span className={`text-xl sm:text-2xl text-[#FF6B2C] transition-all duration-300 transform ${
                            isCurrent 
                              ? 'opacity-100 translate-x-0' 
                              : 'opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0'
                          }`}>
                            →
                          </span>

                          <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#FF6B2C] transition-all duration-400 ease-out ${
                            isCurrent ? 'w-full' : 'w-0 group-hover:w-full'
                          }`} />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* Right Column: Clean Essential Info (Less Wordy) */}
            <div 
              style={{
                transitionDelay: isOpen ? '0.4s' : '0s'
              }}
              className={`lg:col-span-5 flex flex-col gap-6 sm:gap-8 bg-black/30 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-white/10 transition-all duration-600 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div>
                <span className="text-[10px] font-display tracking-[0.2em] uppercase text-[#FF6B2C] block mb-1">
                  Sunday Gatherings
                </span>
                <p className="text-base sm:text-lg font-bold text-white">
                  09:00 AM & 11:00 AM
                </p>
                <p className="text-xs text-[#B0B7C3] mt-0.5">
                  Kids Church & nursery available at both morning services.
                </p>
              </div>

              <div>
                <span className="text-[10px] font-display tracking-[0.2em] uppercase text-[#FF6B2C] block mb-1">
                  Location
                </span>
                <p className="text-sm font-medium text-white">
                  123 Church Street, Lyttelton Manor
                </p>
                <p className="text-xs text-[#B0B7C3]">
                  Centurion, 0157, South Africa · Free on-site parking
                </p>
              </div>

              <div>
                <span className="text-[10px] font-display tracking-[0.2em] uppercase text-[#FF6B2C] block mb-1">
                  Connect & Prayer
                </span>
                <p className="text-xs text-[#B0B7C3] leading-relaxed">
                  hello@cornerstonechurch.co.za<br />
                  +27 12 345 6789
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-display uppercase tracking-widest text-[#FF6B2C] font-semibold">
                    Connect With Us
                  </span>
                  <SocialMediaRow variant="icons" iconClassName="w-3.5 h-3.5" />
                </div>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenPlanVisit();
                  }}
                  className="px-4 py-2 rounded-sm bg-[#FF6B2C] hover:bg-[#FF824D] text-[#080B12] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer self-start sm:self-auto"
                >
                  Plan Visit
                </button>
              </div>
            </div>

          </div>

          <div className="text-[11px] text-[#B0B7C3]/60 flex items-center justify-between pt-6 border-t border-white/10">
            <span>© 2026 Cornerstone Church</span>
            <span className="uppercase tracking-widest">Built on Christ, Open to Everyone</span>
          </div>
        </div>
      </div>
    </>
  );
};
