import React from 'react';
import { SermonsSection } from '../components/SermonsSection';
import { PageId } from '../types';
import { PencilHeading } from '../components/PencilHeading';
import { ArrowLeft, BookOpen, Volume2, Sparkles } from 'lucide-react';

interface SermonsPageProps {
  onNavigate: (page: PageId) => void;
}

export const SermonsPage: React.FC<SermonsPageProps> = ({ onNavigate }) => {
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
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="flex items-center gap-2 text-xs font-display tracking-[0.2em] uppercase text-[#FF6B2C]">
              <span className="w-6 h-px bg-[#FF6B2C]" />
              Biblical Teaching & Media Archive
            </div>
            
            <PencilHeading text="SERMONS & TEACHING" dataPencil="sermons-archive" maxWidth="760px" />

            <p className="text-sm sm:text-base text-[#B0B7C3] leading-relaxed">
              Grounded in scripture and applied straight to modern life. Stream Sunday messages, follow along with series study guides, or listen during your daily commute.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('live')}
                className="btn btn-primary cursor-pointer px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>Watch Live Service</span>
              </button>
              <button
                onClick={() => onNavigate('previous-services')}
                className="px-4 py-2 rounded-sm bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Previous Services ("The Satisfied Life")</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sermons Player & Catalog Component */}
      <SermonsSection />

    </div>
  );
};
