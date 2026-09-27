import React from 'react';
import { Heart, Compass, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';
import { PencilHeading } from './PencilHeading';

interface StorySectionProps {
  onPlanVisit: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ onPlanVisit }) => {
  return (
    <section id="story" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 text-xs font-display tracking-[0.25em] uppercase text-[#FF6B2C] mb-3">
            <span className="w-6 h-px bg-[#FF6B2C]" />
            Who We Are
          </div>
          <PencilHeading text="OUR STORY" dataPencil="story" maxWidth="480px" />
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85"
                alt="Cornerstone Church community praying and sharing in worship"
                className="w-full h-[450px] sm:h-[520px] object-cover filter brightness-[0.95] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#080B12]/85 backdrop-blur-md border border-white/10">
                <span className="text-xs uppercase tracking-widest text-[#FF6B2C] font-semibold block">
                  Established in 2014
                </span>
                <p className="font-display font-bold text-white text-base mt-0.5">
                  Over a decade of grace, community impact, and changed lives across Centurion.
                </p>
              </div>
            </div>

            {/* Accent backdrop ornament */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#FF6B2C]/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Right Column: Story Text and Core Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-snug">
              A home for the searching, a family for the believer, and a beacon of hope for our city.
            </h3>

            <p className="text-base text-[#B0B7C3] leading-relaxed">
              Cornerstone Church began with eight people in a living room who believed that God had a vibrant plan for Centurion. We believe faith is not an isolated religious duty, but an active, joyous journey walked together in genuine community.
            </p>

            <p className="text-base text-[#B0B7C3] leading-relaxed">
              We are unconditionally Christ-centred, Spirit-empowered, and socially responsible. Whether you are stepping through church doors for the first time in years or have walked with Jesus for decades, there is a seat at the table with your name on it.
            </p>

            {/* Core Beliefs Checklist */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs font-display uppercase tracking-widest text-[#FF6B2C] mb-3 font-semibold">
                What We Believe
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#F5F2EE]">
                <div className="flex items-start gap-2.5 bg-white/[0.02] p-2.5 rounded border border-white/5">
                  <ShieldCheck className="w-4 h-4 text-[#FF6B2C] mt-0.5 shrink-0" />
                  <span>The Authority of God’s Word</span>
                </div>
                <div className="flex items-start gap-2.5 bg-white/[0.02] p-2.5 rounded border border-white/5">
                  <Heart className="w-4 h-4 text-[#FF6B2C] mt-0.5 shrink-0" />
                  <span>Salvation by Grace through Faith</span>
                </div>
                <div className="flex items-start gap-2.5 bg-white/[0.02] p-2.5 rounded border border-white/5">
                  <Compass className="w-4 h-4 text-[#FF6B2C] mt-0.5 shrink-0" />
                  <span>The Living Power of the Holy Spirit</span>
                </div>
                <div className="flex items-start gap-2.5 bg-white/[0.02] p-2.5 rounded border border-white/5">
                  <BookOpen className="w-4 h-4 text-[#FF6B2C] mt-0.5 shrink-0" />
                  <span>Love in Action for Our Community</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onPlanVisit}
                className="inline-flex items-center gap-2 text-sm font-display font-semibold text-[#FF6B2C] hover:text-[#FF824D] transition-colors group cursor-pointer"
              >
                <span>Experience Cornerstone in person this Sunday</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
