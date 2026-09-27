import React from 'react';
import { UPCOMING_EVENTS, LEADERSHIP_TEAM } from '../data/churchData';
import { Calendar, MapPin, Clock, ArrowRight, Quote } from 'lucide-react';

interface EventsLeadershipProps {
  onRSVP: (eventTitle: string) => void;
}

export const EventsLeadership: React.FC<EventsLeadershipProps> = ({ onRSVP }) => {
  return (
    <div className="py-20 lg:py-28 relative space-y-24">
      
      {/* ================= EVENTS SECTION ================= */}
      <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-display tracking-[0.2em] uppercase text-[#FF6B2C] mb-2">
              <span className="w-6 h-px bg-[#FF6B2C]" />
              Calendar of Life
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white">
              UPCOMING EVENTS
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#B0B7C3] max-w-md">
            Worship nights, community outreaches, camps, and baptisms. Step in, make a difference, and celebrate life together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {UPCOMING_EVENTS.map((event) => (
            <div
              key={event.id}
              className="bg-[#0A0F1F] rounded-xl border border-white/10 p-6 flex flex-col sm:flex-row gap-6 hover:border-[#FF6B2C]/50 transition-all duration-300 group shadow-lg"
            >
              {/* Date Box */}
              <div className="w-20 h-24 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center shrink-0 group-hover:border-[#FF6B2C] transition-colors">
                <span className="font-display font-black text-3xl text-[#FF6B2C]">
                  {event.day}
                </span>
                <span className="font-display font-semibold text-xs text-white uppercase tracking-wider">
                  {event.month}
                </span>
              </div>

              {/* Event Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-[#FF6B2C] font-semibold uppercase tracking-wider mb-1">
                    <span>{event.category}</span>
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2 leading-snug group-hover:text-[#FF6B2C] transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#B0B7C3] leading-relaxed mb-4">
                    {event.description}
                  </p>

                  <div className="space-y-1 text-xs text-[#B0B7C3] mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#FF6B2C] shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#FF6B2C] shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {event.badges.map((badge, i) => (
                      <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/5 text-[#B0B7C3] border border-white/5">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => onRSVP(event.title)}
                    className="text-xs font-semibold text-[#FF6B2C] hover:text-[#FF824D] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>RSVP / Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* ================= LEADERSHIP SECTION ================= */}
      <section id="leadership" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-display tracking-[0.2em] uppercase text-[#FF6B2C] mb-2">
              <span className="w-6 h-px bg-[#FF6B2C]" />
              Our Shepherds
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white">
              LEADERSHIP TEAM
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#B0B7C3] max-w-md">
            Pastors and directors called to serve, teach, and shepherd our church community with integrity, biblical fidelity, and warm pastoral care.
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
                    className="w-full h-full object-cover filter brightness-[0.75] contrast-105"
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

    </div>
  );
};
