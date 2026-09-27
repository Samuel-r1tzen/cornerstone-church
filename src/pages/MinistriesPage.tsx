import React from 'react';
import { MinistriesSection } from '../components/MinistriesSection';
import { PageId } from '../types';
import { PencilHeading } from '../components/PencilHeading';
import { ArrowLeft, Users, Sparkles, Heart } from 'lucide-react';

interface MinistriesPageProps {
  onNavigate: (page: PageId) => void;
  onJoinMinistry: (ministryTitle: string) => void;
}

export const MinistriesPage: React.FC<MinistriesPageProps> = ({ onNavigate, onJoinMinistry }) => {
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
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="flex items-center gap-2 text-xs font-display tracking-[0.2em] uppercase text-[#FF6B2C]">
              <span className="w-6 h-px bg-[#FF6B2C]" />
              Find Your People
            </div>
            
            <PencilHeading text="COMMUNITIES & MINISTRIES" dataPencil="all-ministries" maxWidth="880px" />

            <p className="text-sm sm:text-base text-[#B0B7C3] leading-relaxed">
              No one was created to walk this journey alone. Whether you are parenting toddlers, navigating high school, starting your career, or seeking deep prayer, discover where you and your family can thrive at Cornerstone.
            </p>
          </div>
        </div>
      </section>

      {/* Ministries Grid Component */}
      <MinistriesSection onJoinMinistry={onJoinMinistry} />

    </div>
  );
};
