import React from 'react';
import { SERVICE_TIMES } from '../data/churchData';
import { Clock, MapPin, Navigation as NavIcon, Users, Coffee, Sparkles } from 'lucide-react';

interface ServiceInfoBarProps {
  onPlanVisit: (serviceName?: string) => void;
}

export const ServiceInfoBar: React.FC<ServiceInfoBarProps> = ({ onPlanVisit }) => {
  return (
    <section id="services-info" className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#0F1424] border border-white/10 rounded-xl p-6 sm:p-8 shadow-2xl shadow-black/80">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-display tracking-[0.2em] uppercase text-[#FF6B2C]">
              <span className="w-5 h-px bg-[#FF6B2C]" />
              Sunday Gathering Schedule
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
              Join Us This Sunday in Centurion
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://maps.google.com/?q=Centurion+South+Africa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-white/15 hover:border-[#FF6B2C] text-xs font-medium text-white transition-all hover:bg-white/5"
            >
              <NavIcon className="w-3.5 h-3.5 text-[#FF6B2C]" />
              <span>Get Directions</span>
            </a>

            <button
              onClick={() => onPlanVisit()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#FF6B2C] hover:bg-[#FF824D] text-[#080B12] text-xs font-bold transition-all shadow-md shadow-[#FF6B2C]/20"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Plan A Visit</span>
            </button>
          </div>
        </div>

        {/* 3 Service Time Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICE_TIMES.map((service, index) => (
            <div 
              key={index}
              className={`relative rounded-lg p-5 border transition-all duration-300 flex flex-col justify-between ${
                service.isPopular 
                  ? 'bg-white/[0.04] border-[#FF6B2C]/60 shadow-lg shadow-[#FF6B2C]/5' 
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}
            >
              {service.isPopular && (
                <div className="absolute -top-3 right-4 bg-[#FF6B2C] text-[#080B12] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                    {service.time}
                  </span>
                  <Clock className="w-5 h-5 text-[#FF6B2C]" />
                </div>

                <h3 className="font-display font-semibold text-lg text-white mb-2">
                  {service.name}
                </h3>

                <p className="text-sm text-[#B0B7C3] leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              <div>
                <div className="space-y-1.5 pt-4 border-t border-white/10 mb-4">
                  {service.features.map((feat, fIndex) => (
                    <div key={fIndex} className="text-xs text-[#F5F2EE]/80 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2C]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onPlanVisit(service.time)}
                  className="w-full py-2 px-3 text-xs font-semibold rounded-sm bg-white/5 hover:bg-[#FF6B2C] hover:text-[#080B12] text-white border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Attend This Service</span>
                  <span className="text-xs">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Campus Practical Amenities Footer */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#B0B7C3]">
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-[#FF6B2C] shrink-0" />
            <span>Free Barista Coffee Lounge</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF6B2C] shrink-0" />
            <span>Full Kids Ministry (0–Gr 7)</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#FF6B2C] shrink-0" />
            <span>Guarded Free Parking Bays</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#FF6B2C] shrink-0" />
            <span>Wheelchair & Pram Accessible</span>
          </div>
        </div>

      </div>
    </section>
  );
};
