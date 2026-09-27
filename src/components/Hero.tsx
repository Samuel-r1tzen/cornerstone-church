import React from 'react';
import { ArrowRight, Play, Calendar, MapPin, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenPlanVisit: () => void;
  onWatchSermon: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPlanVisit, onWatchSermon }) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Image with Dark Contrast Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1548625361-09855589a6ea?auto=format&fit=crop&w=1920&q=85"
          alt="Cornerstone Church Sanctuary Worship Gathering"
          className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-[1.15] scale-105 animate-pulse duration-[10000ms]"
        />
        {/* Layered gradients to match the near-black theme and guarantee high text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B12]/80 via-[#080B12]/60 to-[#080B12]" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#080B12]/40 to-[#080B12]/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center">
        
        {/* Scripture Pill & Sunday Banner */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#FF6B2C]/20 text-[#FF6B2C] border border-[#FF6B2C]/40 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            Matthew 28:19–20
          </span>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-[#B0B7C3] bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Join Us This Sunday · 09:00, 11:00 & 17:30</span>
          </div>
        </div>

        {/* Hero Main Heading */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.02] max-w-4xl">
          GO AND MAKE <br />
          <span className="text-[#FF6B2C] underline decoration-[#FF6B2C]/40 underline-offset-8">
            DISCIPLES
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-[#B0B7C3] max-w-2xl leading-relaxed">
          A Christ-centred community in Centurion, South Africa — passionate about authentic faith, genuine people, and God-given purpose. Whether you are exploring faith or looking for a home, you belong here.
        </p>

        {/* Clear Prominent Calls to Action */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-xl">
          <button
            onClick={onOpenPlanVisit}
            className="flex-1 bg-[#FF6B2C] hover:bg-[#FF824D] text-[#080B12] font-display font-bold text-base px-7 py-4 rounded-sm transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-[#FF6B2C]/25 flex items-center justify-center gap-3 group cursor-pointer"
          >
            <span>Plan Your Visit</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            onClick={onWatchSermon}
            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#FF6B2C] text-white font-display font-medium text-base px-6 py-4 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Play className="w-4 h-4 text-[#FF6B2C] transition-transform duration-300 group-hover:scale-110" />
            <span>Watch Online</span>
          </button>
        </div>

        {/* Bottom Highlights Strip */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl text-left">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B0B7C3] block">Gatherings</span>
            <span className="font-display font-bold text-white text-base">3 Sunday Services</span>
            <span className="text-xs text-[#FF6B2C] block">09:00 / 11:00 / 17:30</span>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-[#B0B7C3] block">Cornerstone Kids</span>
            <span className="font-display font-bold text-white text-base">Ages 0 to Grade 7</span>
            <span className="text-xs text-[#B0B7C3] block">Safe & Secure Check-in</span>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-[#B0B7C3] block">Location</span>
            <span className="font-display font-bold text-white text-base">Centurion Campus</span>
            <span className="text-xs text-[#B0B7C3] block">Lyttelton, South Africa</span>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-[#B0B7C3] block">First Time?</span>
            <span className="font-display font-bold text-[#FF6B2C] text-base">Reserved Parking</span>
            <span className="text-xs text-[#B0B7C3] block">& Free Barista Coffee</span>
          </div>
        </div>

      </div>
    </section>
  );
};
