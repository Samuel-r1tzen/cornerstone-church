import React from 'react';
import { WhatToExpect } from '../components/WhatToExpect';
import { ContactSection } from '../components/ContactSection';
import { PencilHeading } from '../components/PencilHeading';
import { PageId } from '../types';
import { 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Coffee, 
  Clock, 
  Car, 
  Baby, 
  Smile, 
  ArrowLeft 
} from 'lucide-react';

interface PlanVisitPageProps {
  onNavigate: (page: PageId) => void;
}

export const PlanVisitPage: React.FC<PlanVisitPageProps> = ({ onNavigate }) => {
  const scrollToForm = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#FF6B2C]/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="flex items-center gap-2 text-xs font-display tracking-[0.2em] uppercase text-[#FF6B2C]">
              <span className="w-6 h-px bg-[#FF6B2C]" />
              First Time Guest Guide
            </div>
            
            <PencilHeading text="PLAN YOUR VISIT" dataPencil="plan-visit" maxWidth="600px" />

            <p className="text-sm sm:text-base text-[#B0B7C3] leading-relaxed">
              We know visiting a new church can feel intimidating. From reserved guest parking to safe kids check-in and complimentary barista coffee, here is everything you need to know before walking through our doors.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button
                onClick={scrollToForm}
                className="px-6 py-3 rounded-sm bg-[#FF6B2C] hover:bg-[#FF824D] text-[#080B12] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-[#FF6B2C]/20 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Let Us Know You're Coming</span>
              </button>

              <div className="text-xs text-[#B0B7C3] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#FF6B2C]" />
                <span>Lyttelton Manor, Centurion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full 5-Step Process & FAQs Component */}
      <WhatToExpect onPlanVisit={scrollToForm} />

      {/* Direct Visit Booking Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactSection 
          initialInquiryType="visit"
          initialService="09:00 AM"
        />
      </section>

    </div>
  );
};
