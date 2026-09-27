import React from 'react';
import { StorySection } from '../components/StorySection';
import { LEADERSHIP_TEAM } from '../data/churchData';
import { PageId } from '../types';
import { PencilHeading } from '../components/PencilHeading';
import { ArrowLeft, Quote, Heart, ArrowRight } from 'lucide-react';

interface OurStoryPageProps {
  onNavigate: (page: PageId) => void;
  onPlanVisit: () => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ onNavigate, onPlanVisit }) => {
  return (
    <div className="pt-24 pb-20 space-y-16">
      
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#B0B7C3] hover:text-[#FF6B2C] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-[#0A0F1F] rounded-2xl border border-white/10 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="flex items-center gap-2 text-xs font-display tracking-[0.2em] uppercase text-[#FF6B2C]">
              <span className="w-6 h-px bg-[#FF6B2C]" />
              Who We Are & What We Believe
            </div>
            
            <PencilHeading text="ROOTED IN CHRIST" dataPencil="rooted" maxWidth="680px" />
 
            <p className="text-sm sm:text-base text-[#B0B7C3] leading-relaxed">
              Started in 2014 by a small group of families gathered in a living room, Cornerstone Church Centurion has grown into a vibrant, multi-generational spiritual home anchored on the unchanging gospel of Jesus Christ.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Beliefs Component */}
      <StorySection onPlanVisit={onPlanVisit} />

      {/* Leadership Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-display tracking-[0.2em] uppercase text-[#FF6B2C] mb-3">
              <span className="w-6 h-px bg-[#FF6B2C]" />
              Our Shepherds
            </div>
            <PencilHeading text="PASTORAL LEADERSHIP" dataPencil="leadership" maxWidth="780px" />
          </div>
          <p className="text-sm text-[#B0B7C3] max-w-md">
            Pastors and directors called to shepherd our church community with integrity, biblical fidelity, and warm pastoral care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LEADERSHIP_TEAM.map((leader) => (
            <div
              key={leader.id}
              className="bg-[#0A0F1F] rounded-xl border border-white/10 overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={leader.imageUrl}
                    alt={leader.name}
                    className="w-full h-full object-cover filter brightness-[0.98] contrast-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1F] via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-bold px-3 py-1 rounded bg-[#FF6B2C] text-[#080B12]">
                    {leader.role}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-display font-bold text-xl text-white">
                    {leader.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B0B7C3] leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="p-3.5 rounded bg-white/[0.03] border border-white/5 text-xs text-[#F5F2EE]/90 italic flex items-start gap-2">
                  <Quote className="w-4 h-4 text-[#FF6B2C] shrink-0 mt-0.5" />
                  <span>{leader.quote}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#0F1424] to-[#0A0F1F] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-display font-bold text-2xl text-white">
              We Would Love to Welcome You This Sunday
            </h3>
            <p className="text-xs sm:text-sm text-[#B0B7C3]">
              Join us at 09:00 AM, 11:00 AM, or 17:30 PM in Lyttelton Manor, Centurion.
            </p>
          </div>
          <button
            onClick={onPlanVisit}
            className="px-6 py-3.5 rounded-sm bg-[#FF6B2C] hover:bg-[#FF824D] text-[#080B12] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 transition-colors shadow-lg shadow-[#FF6B2C]/20"
          >
            <span>Plan Your Visit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
