import React from 'react';
import { PageId } from '../types';
import { PencilHeading } from '../components/PencilHeading';
import { ArrowLeft, Radio, Calendar, Clock, Youtube, History, ExternalLink, Bell } from 'lucide-react';

interface LiveServicePageProps {
  onNavigate: (page: PageId) => void;
}

export const LiveServicePage: React.FC<LiveServicePageProps> = ({ onNavigate }) => {
  const channelId = 'UCVoVFJQEeAn-xvq_HAf5r6A';
  const liveEmbedUrl = `https://www.youtube.com/embed/live_stream?channel=${channelId}`;

  return (
    <div className="pt-24 pb-20 space-y-12">
      
      {/* Top Header & Breadcrumb */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#B0B7C3] hover:text-[#FF6B2C] mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-[#0A0F1F] rounded-2xl border border-white/10 p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#FF6B2C]/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="flex flex-wrap items-center gap-3 text-xs font-display tracking-[0.2em] uppercase text-[#FF6B2C]">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF6B2C]/15 border border-[#FF6B2C]/30 text-[#FF6B2C] font-semibold">
                <Radio className="w-3.5 h-3.5 animate-pulse text-[#FF6B2C]" />
                Official Livestream
              </span>
              <span>3C Church · Bert Pretorius</span>
            </div>
            
            <PencilHeading text="LIVE SERVICE" dataPencil="live-service" maxWidth="640px" />

            <p className="text-sm sm:text-base text-[#B0B7C3] leading-relaxed">
              Experience the presence of God, powerful worship, and life-transforming biblical teaching wherever you are in the world.
            </p>
          </div>
        </div>
      </section>

      {/* Main Livestream Player Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A0F1F] rounded-2xl border border-white/10 p-4 sm:p-8 space-y-8 shadow-2xl">
          
          {/* Status & Service Notice */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FF6B2C]/20 border border-[#FF6B2C]/30 flex items-center justify-center text-[#FF6B2C] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#FF6B2C] font-semibold">
                  Service Broadcast Times
                </p>
                <p className="text-sm sm:text-base font-bold text-white">
                  Sundays — 09:00
                </p>
              </div>
            </div>

            {/* Live/Offline status note */}
            <div className="flex items-center gap-2 text-xs text-[#B0B7C3] bg-black/40 px-3.5 py-2 rounded-lg border border-white/5">
              <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-ping inline-block" />
              <span>Auto-detects live service when broadcast begins</span>
            </div>
          </div>

          {/* Responsive 16:9 Livestream Player */}
          <div className="relative">
            <div className="video-container rounded-2xl border border-white/15 shadow-2xl bg-black overflow-hidden ring-1 ring-white/10">
              <iframe
                src={liveEmbedUrl}
                title="3C Church Live Service"
                aria-label="3C Church YouTube Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>

          {/* Offline Information Note */}
          <div className="p-4 rounded-xl bg-[#141A29]/60 border border-white/10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#FF6B2C]">
                Stream Notice
              </p>
              <p className="text-sm text-[#B0B7C3]">
                3C Church is not live right now. Check back during our next service.
              </p>
            </div>
            
            <a
              href="https://www.youtube.com/@BertPretorius?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Subscribe to Bert Pretorius on YouTube for live alerts"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors shrink-0"
            >
              <Bell className="w-3.5 h-3.5 text-[#FF6B2C]" />
              <span>Get Live Notifications</span>
            </a>
          </div>

          {/* Under-video content as required */}
          <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl text-white">
                Join us for our live services.
              </h3>
              <p className="text-sm text-[#FF6B2C] font-semibold">
                Sundays — 09:00
              </p>
              <p className="text-xs text-[#B0B7C3] max-w-md">
                Stream live from anywhere or join us in-person at our Centurion campus. All messages remain accessible immediately after the live broadcast.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Mandatory View Previous Services Button */}
              <button
                onClick={() => onNavigate('previous-services')}
                className="btn btn-primary cursor-pointer px-6 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center gap-2"
                aria-label="View Previous Services"
              >
                <History className="w-4 h-4" />
                <span>VIEW PREVIOUS SERVICES</span>
              </button>

              <a
                href="https://www.youtube.com/@BertPretorius"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Bert Pretorius on YouTube"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors"
              >
                <Youtube className="w-4 h-4 text-[#FF6B2C]" />
                <span>YouTube Channel</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#B0B7C3]" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* In-Person Campus Option */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0A0F1F] rounded-2xl border border-white/10 p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#FF6B2C] text-xs font-semibold uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>Plan Your Visit</span>
            </div>
            <h4 className="font-display font-bold text-lg text-white">Prefer to Attend in Person?</h4>
            <p className="text-xs sm:text-sm text-[#B0B7C3] leading-relaxed">
              We would love to welcome you in Centurion. Reserved parking, welcoming hosts, and fun, safe kids church are ready for you.
            </p>
            <button
              onClick={() => onNavigate('visit')}
              className="text-xs font-semibold text-[#FF6B2C] hover:text-[#FF824D] inline-flex items-center gap-1.5 transition-colors cursor-pointer pt-2"
            >
              <span>Plan Your Sunday Visit</span>
              <span>→</span>
            </button>
          </div>

          <div className="bg-[#0A0F1F] rounded-2xl border border-white/10 p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#FF6B2C] text-xs font-semibold uppercase tracking-wider">
              <History className="w-4 h-4" />
              <span>Message Series</span>
            </div>
            <h4 className="font-display font-bold text-lg text-white">The Satisfied Life Series</h4>
            <p className="text-xs sm:text-sm text-[#B0B7C3] leading-relaxed">
              Missed a service? Dive straight into Pastor Bert and Pastor Charné Pretorius's latest series "The Satisfied Life" on demand.
            </p>
            <button
              onClick={() => onNavigate('previous-services')}
              className="text-xs font-semibold text-[#FF6B2C] hover:text-[#FF824D] inline-flex items-center gap-1.5 transition-colors cursor-pointer pt-2"
            >
              <span>Explore The Satisfied Life Series</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
