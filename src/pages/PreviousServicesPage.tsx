import React, { useState } from 'react';
import { PageId } from '../types';
import { PencilHeading } from '../components/PencilHeading';
import { ArrowLeft, Radio, Play, Youtube, ExternalLink, Sparkles, BookOpen, Layers } from 'lucide-react';

interface PreviousServicesPageProps {
  onNavigate: (page: PageId) => void;
}

export const PreviousServicesPage: React.FC<PreviousServicesPageProps> = ({ onNavigate }) => {
  // Official Bert Pretorius / 3C Church playlist ID for live stream series & Satisfied Life services
  const playlistId = 'UULVVoVFJQEeAn-xvq_HAf5r6A';
  
  // Specific sermon video highlights from The Satisfied Life series
  const satisfiedLifeSeries = [
    {
      part: 'Part 3',
      title: 'The Satisfied Life 3',
      speaker: 'Charné Pretorius',
      videoId: 'K45c4_w-EbY',
      liveServiceId: 'bTv92Dkw9uM',
      duration: '44 mins',
      date: 'September 2026',
      description: 'Living with divine contentment, holy focus, and supernatural peace in every season of life.',
    },
    {
      part: 'Part 2',
      title: 'The Satisfied Life 2',
      speaker: 'Bert Pretorius',
      videoId: 'Ld8Q4Nlk7EE',
      liveServiceId: 'yvIRTDSVh9w',
      duration: '56 mins',
      date: 'September 2026',
      description: 'Unpacking the biblical keys to a truly satisfied heart that cannot be shaken by outward circumstances.',
    },
    {
      part: 'Part 1',
      title: 'The Satisfied Life',
      speaker: 'Bert Pretorius',
      videoId: 'uTmPCjIP6vA',
      liveServiceId: 'gdeGEjwMteo',
      duration: '54 mins',
      date: 'September 2026',
      description: 'Discovering total fulfillment in Jesus Christ as our shepherd, provision, and eternal source.',
    },
  ];

  // Optional selected specific video to preview, or full playlist embed
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // If a specific video is clicked, embed it with playlist context; otherwise embed the full playlist
  const embedSrc = activeVideoId 
    ? `https://www.youtube.com/embed/${activeVideoId}?list=${playlistId}`
    : `https://www.youtube.com/embed/videoseries?list=${playlistId}`;

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
                <Layers className="w-3.5 h-3.5 text-[#FF6B2C]" />
                Official Playlist
              </span>
              <span>"The Satisfied Life" Series Archive</span>
            </div>
            
            <PencilHeading text="PREVIOUS SERVICES" dataPencil="previous-services" maxWidth="760px" />

            <p className="text-sm sm:text-base text-[#B0B7C3] leading-relaxed">
              Catch up on previous Sunday services and message series from Pastor Bert and Pastor Charné Pretorius. Stream the complete playlist below, automatically synced with the official 3C Church YouTube channel.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('live')}
                className="btn btn-primary cursor-pointer px-5 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                aria-label="Go to Live Service"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>GO TO LIVE SERVICE</span>
              </button>

              {activeVideoId && (
                <button
                  onClick={() => setActiveVideoId(null)}
                  className="px-4 py-2.5 rounded-sm bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  Reset to Full Playlist
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Playlist Player Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A0F1F] rounded-2xl border border-white/10 p-4 sm:p-8 space-y-6 shadow-2xl">
          
          {/* Playlist Information Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#FF6B2C] font-semibold">
                Official YouTube Playlist
              </p>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {activeVideoId ? 'Playing Selected Message' : 'The Satisfied Life & Recent Sunday Services'}
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#B0B7C3]">
              <span className="w-2 h-2 rounded-full bg-[#FF6B2C] inline-block" />
              <span>Automatically updates when new services are broadcast</span>
            </div>
          </div>

          {/* Responsive 16:9 Playlist Embed Container */}
          <div className="video-container rounded-2xl border border-white/15 shadow-2xl bg-black overflow-hidden ring-1 ring-white/10">
            <iframe
              src={embedSrc}
              title="3C Church Previous Services - The Satisfied Life"
              aria-label="3C Church Previous Services Playlist"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#B0B7C3]">
            <p>
              Click the playlist menu icon <span className="text-white font-semibold">(☰)</span> in the top-right corner of the video player above to browse all previous services.
            </p>
            <a
              href={`https://www.youtube.com/playlist?list=${playlistId}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open playlist on YouTube"
              className="inline-flex items-center gap-1.5 text-[#FF6B2C] hover:text-[#FF824D] transition-colors shrink-0"
            >
              <span>Open Playlist on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* "The Satisfied Life" Series Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-display tracking-[0.2em] uppercase text-[#FF6B2C]">
            <Sparkles className="w-3.5 h-3.5" />
            Series Spotlight
          </div>
          <h3 className="font-display font-bold text-2xl text-white mt-1">
            "The Satisfied Life" Series Episodes
          </h3>
          <p className="text-xs sm:text-sm text-[#B0B7C3] mt-1 max-w-2xl">
            Select any message below to load it into the player above or stream directly on YouTube.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {satisfiedLifeSeries.map((item) => {
            const isPlaying = activeVideoId === item.videoId || activeVideoId === item.liveServiceId;
            return (
              <div 
                key={item.part}
                className={`bg-[#0A0F1F] rounded-2xl border transition-all duration-300 p-6 flex flex-col justify-between space-y-4 ${
                  isPlaying 
                    ? 'border-[#FF6B2C] shadow-lg shadow-[#FF6B2C]/10 ring-1 ring-[#FF6B2C]' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B2C]/20 text-[#FF6B2C] font-bold">
                      {item.part}
                    </span>
                    <span className="text-[#B0B7C3]">{item.duration}</span>
                  </div>

                  <h4 className="font-display font-bold text-lg text-white">
                    {item.title}
                  </h4>

                  <p className="text-xs text-[#FF6B2C] font-semibold">
                    Speaker: {item.speaker}
                  </p>

                  <p className="text-xs text-[#B0B7C3] leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveVideoId(item.videoId);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className={`flex-1 py-2 px-3 rounded-md text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      isPlaying 
                        ? 'bg-[#FF6B2C] text-[#080B12]' 
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isPlaying ? 'Playing Now' : 'Watch Sermon'}</span>
                  </button>

                  <a
                    href={`https://www.youtube.com/watch?v=${item.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch ${item.title} on YouTube`}
                    className="p-2 rounded-md bg-white/5 hover:bg-white/10 text-white transition-colors"
                    title="Watch on YouTube"
                  >
                    <Youtube className="w-4 h-4 text-[#FF6B2C]" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Return to Live or Home Footer Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-[#0A0F1F] border border-white/10 text-center space-y-4">
          <h3 className="font-display font-bold text-xl text-white">
            Join Our Next Live Service
          </h3>
          <p className="text-xs sm:text-sm text-[#B0B7C3] max-w-lg mx-auto">
            We broadcast live every Sunday at 09:00. Set a reminder or subscribe to never miss a moment of worship and teaching.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('live')}
              className="btn btn-primary cursor-pointer px-6 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>WATCH LIVE SERVICE</span>
            </button>
            <button
              onClick={() => onNavigate('visit')}
              className="btn cursor-pointer px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border-none"
            >
              <span>Plan A Visit</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
