import React, { useState } from 'react';
import { VISITOR_GUIDELINES, CHURCH_FAQS } from '../data/churchData';
import { PencilHeading } from './PencilHeading';
import { 
  Car, 
  Baby, 
  Coffee, 
  Clock, 
  Smile, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface WhatToExpectProps {
  onPlanVisit: () => void;
}

export const WhatToExpect: React.FC<WhatToExpectProps> = ({ onPlanVisit }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0: return <Car className="w-5 h-5 text-[#FF6B2C]" />;
      case 1: return <Baby className="w-5 h-5 text-[#FF6B2C]" />;
      case 2: return <Coffee className="w-5 h-5 text-[#FF6B2C]" />;
      case 3: return <Clock className="w-5 h-5 text-[#FF6B2C]" />;
      default: return <Smile className="w-5 h-5 text-[#FF6B2C]" />;
    }
  };

  return (
    <section id="what-to-expect" className="py-20 bg-[#0A0F1F]/60 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-display tracking-[0.2em] uppercase text-[#FF6B2C] mb-3">
              <span className="w-6 h-px bg-[#FF6B2C]" />
              First Time Guest Experience
            </div>
            <PencilHeading text="WHAT TO EXPECT" dataPencil="visit" maxWidth="640px" />
          </div>
          <p className="text-sm sm:text-base text-[#B0B7C3] max-w-md">
            Walking into a church for the first time can feel intimidating. Here is exactly what will happen when you arrive so you can feel completely at home.
          </p>
        </div>

        {/* 5-Step Process Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {VISITOR_GUIDELINES.map((item, idx) => (
            <div 
              key={idx}
              className="bg-[#080B12] border border-white/10 hover:border-[#FF6B2C]/50 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#FF6B2C]/10 group-hover:border-[#FF6B2C]/30 transition-colors">
                    {getStepIcon(idx)}
                  </div>
                  <span className="font-display font-mono text-xs text-[#FF6B2C] font-semibold bg-[#FF6B2C]/10 px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                </div>

                <div className="font-mono text-xs text-[#B0B7C3]/60 mb-1">
                  Step {item.step}
                </div>

                <h3 className="font-display font-bold text-base text-white mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#B0B7C3] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-[#FF6B2C]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Guest friendly guarantee</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive FAQ & Help Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-4 bg-[#0F1424] p-6 rounded-xl border border-white/10">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#FF6B2C] font-semibold mb-2">
              <Sparkles className="w-4 h-4" />
              Need Personal Assistance?
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-3">
              We Would Love to Host You Personally
            </h3>
            <p className="text-xs text-[#B0B7C3] leading-relaxed mb-6">
              When you let us know you are coming, our host team will meet you at the front doors, help check in your children, show you to great seats, and hand you a warm cup of coffee.
            </p>

            <button
              onClick={onPlanVisit}
              className="w-full py-3 px-4 rounded-sm bg-[#FF6B2C] hover:bg-[#FF824D] text-[#080B12] font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-[#FF6B2C]/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Let Us Know You're Coming</span>
            </button>
          </div>

          <div className="lg:col-span-8 space-y-3">
            <h3 className="font-display font-semibold text-lg text-white mb-4 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#FF6B2C]" />
              Frequently Asked Questions for Guests
            </h3>

            {CHURCH_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className="bg-[#080B12] border border-white/10 rounded-lg overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="font-display font-medium text-sm sm:text-base text-white">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded-full bg-white/5 text-[#FF6B2C] shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#B0B7C3] leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
