import React, { useState } from 'react';
import { UPCOMING_EVENTS } from '../data/churchData';
import { PageId, ChurchEvent } from '../types';
import { PencilHeading } from '../components/PencilHeading';
import { WorshipEventFallback } from '../components/WorshipEventFallback';
import { EventRsvpModal } from '../components/EventRsvpModal';
import { ArrowLeft, Calendar, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';

interface EventsPageProps {
  onNavigate: (page: PageId) => void;
  onRSVP?: (eventTitle: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onNavigate, onRSVP }) => {
  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenRsvp = (event: ChurchEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-24 pb-20 space-y-16">
      <EventRsvpModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
        onSuccess={(title) => {
          if (onRSVP) onRSVP(title);
        }}
      />
      
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
              Calendar of Life & Gatherings
            </div>
            
            <PencilHeading text="UPCOMING EVENTS" dataPencil="events" maxWidth="680px" />

            <p className="text-sm sm:text-base text-[#B0B7C3] leading-relaxed">
              From immersive worship nights and youth camps to community food distributions and baptism celebrations, discover what is coming up next in our church family.
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {UPCOMING_EVENTS.map((event) => (
            <div
              key={event.id}
              className="bg-[#0A0F1F] rounded-xl border border-white/10 overflow-hidden flex flex-col hover:border-[#FF6B2C]/50 transition-all duration-300 group shadow-lg"
            >
              {/* Event Image Banner */}
              {event.imageUrl ? (
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#080B12]">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1F] via-[#0A0F1F]/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[#FF6B2C] border border-white/10">
                      {event.category}
                    </span>
                  </div>
                </div>
              ) : (
                <WorshipEventFallback size="card" className="h-44 sm:h-48 rounded-none border-b border-white/10" />
              )}

              <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 flex-1">
                {/* Date Badge */}
                <div className="w-20 h-24 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center shrink-0 group-hover:border-[#FF6B2C] transition-colors self-start">
                  <span className="font-display font-black text-3xl text-[#FF6B2C]">
                    {event.day}
                  </span>
                  <span className="font-display font-semibold text-xs text-white uppercase tracking-wider">
                    {event.month}
                  </span>
                </div>

                {/* Event Content */}
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {!event.imageUrl && (
                      <span className="text-[11px] text-[#FF6B2C] font-semibold uppercase tracking-wider block mb-1">
                        {event.category}
                      </span>
                    )}

                    <h3 className="font-display font-bold text-xl text-white mb-2 leading-snug group-hover:text-[#FF6B2C] transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#B0B7C3] leading-relaxed mb-4">
                      {event.description}
                    </p>

                    <div className="space-y-1 text-xs text-[#B0B7C3]">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#FF6B2C] shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#FF6B2C] shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {event.badges.map((badge, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[#B0B7C3]">
                          {badge}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleOpenRsvp(event)}
                      className="text-xs font-semibold text-[#FF6B2C] hover:text-[#FF824D] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>RSVP Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
