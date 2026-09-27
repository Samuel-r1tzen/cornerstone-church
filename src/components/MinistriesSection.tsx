import React, { useState } from 'react';
import { MINISTRIES_DATA } from '../data/churchData';
import { Ministry } from '../types';
import { PencilHeading } from './PencilHeading';
import { ArrowRight, Clock, User, Check, Sparkles } from 'lucide-react';

interface MinistriesSectionProps {
  onJoinMinistry: (ministryTitle: string) => void;
}

export const MinistriesSection: React.FC<MinistriesSectionProps> = ({ onJoinMinistry }) => {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry>(MINISTRIES_DATA[0]);

  return (
    <section id="ministries" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-display tracking-[0.2em] uppercase text-[#FF6B2C] mb-3">
              <span className="w-6 h-px bg-[#FF6B2C]" />
              Find Your People
            </div>
            <PencilHeading text="OUR MINISTRIES" dataPencil="ministries" maxWidth="580px" />
          </div>
          <p className="text-sm sm:text-base text-[#B0B7C3] max-w-md">
            No one was created to walk this journey alone. Explore our generational and purpose-driven ministries to find where you and your family can thrive.
          </p>
        </div>

        {/* Ministries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MINISTRIES_DATA.map((ministry) => {
            const isSelected = selectedMinistry.id === ministry.id;
            return (
              <div
                key={ministry.id}
                className="group relative bg-[#0A0F1F] rounded-xl overflow-hidden border border-white/10 hover:border-[#FF6B2C]/60 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                {/* Image Banner */}
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={ministry.imageUrl}
                    alt={ministry.title}
                    className="w-full h-full object-cover filter brightness-[0.7] contrast-110 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1F] via-[#0A0F1F]/40 to-transparent" />
                  
                  <span className="absolute top-4 left-4 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-[#080B12]/80 backdrop-blur-md text-[#FF6B2C] border border-white/10">
                    {ministry.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-[#FF6B2C] transition-colors">
                      {ministry.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#B0B7C3] leading-relaxed mb-4">
                      {ministry.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-[#F5F2EE]/90 mb-4 bg-white/[0.02] p-3 rounded border border-white/5">
                      <div className="flex items-center gap-2 text-[#B0B7C3]">
                        <Clock className="w-3.5 h-3.5 text-[#FF6B2C] shrink-0" />
                        <span>{ministry.meetingTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#B0B7C3]">
                        <User className="w-3.5 h-3.5 text-[#FF6B2C] shrink-0" />
                        <span>Lead: {ministry.lead}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {ministry.highlights.map((h, i) => (
                        <div key={i} className="text-[11px] text-[#B0B7C3] flex items-center gap-2">
                          <Check className="w-3 h-3 text-[#FF6B2C] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <button
                      onClick={() => onJoinMinistry(ministry.title)}
                      className="w-full py-2.5 px-4 rounded-sm bg-white/5 hover:bg-[#FF6B2C] text-[#F5F2EE] hover:text-[#080B12] text-xs font-semibold tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Connect with {ministry.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
