import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { PageId, InquiryType } from '../types';
import { PencilHeading } from '../components/PencilHeading';
import { ArrowLeft, MapPin, Phone, Mail, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  initialType?: InquiryType;
  initialMessage?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ 
  onNavigate, 
  initialType = 'visit', 
  initialMessage = '' 
}) => {
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
              We Are Here For You
            </div>
            
            <PencilHeading text="CONNECT WITH US" dataPencil="contact-us" maxWidth="680px" />

            <p className="text-sm sm:text-base text-[#B0B7C3] leading-relaxed">
              Whether you are planning your first Sunday visit, requesting confidential pastoral prayer, or asking questions about our ministries, our pastoral team is ready to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <ContactSection 
        initialInquiryType={initialType}
        initialMessage={initialMessage}
      />

    </div>
  );
};
