import React, { useState } from 'react';
import { PageId } from '../types';
import { PencilHeading } from '../components/PencilHeading';
import { 
  ArrowLeft, 
  Radio, 
  Play, 
  Youtube, 
  ExternalLink, 
  Clock, 
  Calendar, 
  Bell, 
  Layers, 
  Share2, 
  BookOpen, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface WatchWorshipPageProps {
  onNavigate: (page: PageId) => void;
  initialTab?: 'live' | 'previous';
}

export const WatchWorshipPage: React.FC<WatchWorshipPageProps> = ({ 
  onNavigate, 
  initialTab = 'live' 
}) => {
  const [activeTab, setActiveTab] = useState<'live' | 'previous'>(initialTab);
  const [copiedLink, setCopiedLink] = useState(false);

  // Official Bert Pretorius / 3C Church YouTube Channel ID & Playlist
  const CHANNEL_ID = 'UCVoVFJQEeAn-xvq_HAf5r6A';
  const PLAYLIST_ID = 'UULVVoVFJQEeAn-xvq_HAf5r6A'; // Official channel uploads/series playlist
  const SATISFIED_LIFE_PART3 = 'f252zDq1e58'; // Charné Pretorius - Part 3
  const SATISFIED_LIFE_PART2 = 'w2K3yV-sVv8'; // Bert Pretorius - Part 2

  // Active video in Previous Services tab (defaults to playlist series embed)
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const liveEmbedUrl = `https://www.youtube.com/embed/live_stream?channel=${CHANNEL_ID}&autoplay=0&rel=0`;
  const playlistEmbedUrl = selectedVideoId 
    ? `https://www.youtube.com/embed/${selectedVideoId}?rel=0&autoplay=1`
    : `https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}&rel=0`;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Watch & Worship | Cornerstone Church',
          text: 'Join us live or catch up on previous services and series.',
          url,
        });
      } catch {
        // Fallback to clipboard
      }
    } else {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const episodes = [
    {
      part: 'Part 3',
      title: 'The Satisfied Life: Finding Peace in God’s Presence',
      speaker: 'Pastor Charné Pretorius',
      date: 'Recent Service',
      duration: '48 mins',
      videoId: SATISFIED_LIFE_PART3,
      tag: 'Latest in Series',
      description: 'Discover how abiding in Jesus creates unshakeable inner peace regardless of life’s turbulent seasons.'
    },
    {
      part: 'Part 2',
      title: 'The Satisfied Life: Contentment Over Comparison',
      speaker: 'Pastor Bert Pretorius',
      date: 'Sunday Service',
      duration: '52 mins',
      videoId: SATISFIED_LIFE_PART2,
      tag: 'Featured Sermon',
      description: 'A transformative message on breaking free from the comparison trap and finding joy in God’s specific calling.'
    },
    {
      part: 'Part 1',
      title: 'The Satisfied Life: The True Source of Fulfillment',
      speaker: 'Pastor Bert Pretorius',
      date: 'Series Premiere',
      duration: '50 mins',
      videoId: null, // loads full playlist
      tag: 'Foundation',
      description: 'The opening message exploring Psalm 23 and why true spiritual satisfaction can only be found in Jesus Christ.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F5F2EE] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B0B7C3] hover:text-[#FF6B2C] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <span className="text-[11px] font-medium text-[#B0B7C3]/80 tracking-widest uppercase">
            Built on Christ, Open to Everyone
          </span>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <PencilHeading
            tag="ONLINE CAMPUS"
            title="WATCH & WORSHIP"
            subtitle="Stream Sunday services live, or catch up on previous messages and series anytime from anywhere in the world."
            align="center"
          />

          {/* Combined Tabs: Live Service vs Previous Services */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-[#121829] border border-white/10 shadow-lg">
            <button
              onClick={() => setActiveTab('live')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                activeTab === 'live'
                  ? 'bg-[#FF6B2C] text-[#080B12] shadow-md shadow-[#FF6B2C]/25'
                  : 'text-[#B0B7C3] hover:text-white hover:bg-white/5'
              }`}
              aria-label="Switch to Live Service"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeTab === 'live' ? 'bg-[#080B12]' : 'bg-[#FF6B2C]'}`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${activeTab === 'live' ? 'bg-[#080B12]' : 'bg-[#FF6B2C]'}`} />
              </span>
              <span>Live Service</span>
            </button>

            <button
              onClick={() => setActiveTab('previous')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                activeTab === 'previous'
                  ? 'bg-[#FF6B2C] text-[#080B12] shadow-md shadow-[#FF6B2C]/25'
                  : 'text-[#B0B7C3] hover:text-white hover:bg-white/5'
              }`}
              aria-label="Switch to Previous Services"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Previous Services</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            TAB 1: LIVE SERVICE
           ======================================================== */}
        {activeTab === 'live' && (
          <div className="space-y-10 animate-fade-in">
            {/* Live Service Player Container */}
            <div className="relative rounded-xl overflow-hidden bg-[#0F1424] border border-white/10 shadow-2xl">
              {/* Top Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-[#0C101D] border-b border-white/5 text-xs text-[#B0B7C3]">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-semibold uppercase tracking-wider text-[11px]">
                    <Radio className="w-3 h-3 animate-pulse" />
                    YouTube Live Stream
                  </span>
                  <span className="hidden sm:inline text-white/40">|</span>
                  <span className="hidden sm:inline text-white/80 font-medium">Official Bert Pretorius / 3C Channel</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-white/90 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#FF6B2C]" />
                    <span>Sundays — 09:00</span>
                  </div>
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-1 text-[#B0B7C3] hover:text-white transition-colors cursor-pointer"
                    title="Share stream link"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">{copiedLink ? 'Copied!' : 'Share'}</span>
                  </button>
                </div>
              </div>

              {/* 16:9 Video Container with channel-based live stream embed */}
              <div className="video-container bg-black">
                <iframe
                  src={liveEmbedUrl}
                  title="3C Church Live Service"
                  aria-label="3C Church YouTube Live Stream"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              {/* Player Bottom Information */}
              <div className="p-6 sm:p-8 bg-gradient-to-b from-[#0C101D] to-[#0A0D18]">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <span className="text-[11px] font-display font-semibold uppercase tracking-widest text-[#FF6B2C]">
                      Welcome to Cornerstone Online
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                      Join us for our live services.
                    </h2>
                    <p className="text-xs sm:text-sm text-[#B0B7C3] max-w-2xl leading-relaxed">
                      Experience uplifting worship, fervent prayer, and practical biblical preaching. Stream every Sunday morning or gather with us at the physical sanctuary.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setActiveTab('previous')}
                      className="px-5 py-3 rounded-sm bg-[#FF6B2C] hover:bg-[#FF824D] text-[#080B12] text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-2 shadow-lg shadow-[#FF6B2C]/20"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>VIEW PREVIOUS SERVICES</span>
                    </button>

                    <a
                      href="https://www.youtube.com/@BertPretorius?sub_confirmation=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 rounded-sm bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors flex items-center gap-2"
                    >
                      <Youtube className="w-4 h-4 text-red-500" />
                      <span>Subscribe</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/50" />
                    </a>
                  </div>
                </div>

                {/* Offline & Service Times Info Notice */}
                <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-[#FF6B2C] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Service Times</h4>
                      <p className="text-xs text-[#B0B7C3] mt-1">
                        <strong>Sundays — 09:00</strong> live broadcast. Additional in-person services at 11:00 & 17:30.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 flex items-start gap-3.5">
                    <Radio className="w-5 h-5 text-[#FF6B2C] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">When We Are Offline</h4>
                      <p className="text-xs text-[#B0B7C3] mt-1">
                        3C Church is not live right now. Check back during our next service or browse the series archive below.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 flex items-start gap-3.5">
                    <Bell className="w-5 h-5 text-[#FF6B2C] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Live Notifications</h4>
                      <p className="text-xs text-[#B0B7C3] mt-1">
                        Turn on notifications on YouTube to receive a reminder the moment we go live on Sunday.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: PREVIOUS SERVICES
           ======================================================== */}
        {activeTab === 'previous' && (
          <div className="space-y-10 animate-fade-in">
            {/* Playlist Player Container */}
            <div className="relative rounded-xl overflow-hidden bg-[#0F1424] border border-white/10 shadow-2xl">
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-[#0C101D] border-b border-white/5 text-xs text-[#B0B7C3]">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 text-[#FF6B2C] font-semibold uppercase tracking-wider text-[11px]">
                    <Layers className="w-3 h-3" />
                    Featured Series: The Satisfied Life
                  </span>
                  <span className="hidden sm:inline text-white/40">|</span>
                  <span className="hidden sm:inline text-white/80 font-medium">Bert Pretorius / 3C Church YouTube Playlist</span>
                </div>

                <div className="flex items-center gap-3">
                  {selectedVideoId && (
                    <button
                      onClick={() => setSelectedVideoId(null)}
                      className="text-[11px] text-[#FF6B2C] hover:underline cursor-pointer"
                    >
                      ← Back to Full Playlist
                    </button>
                  )}
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-1 text-[#B0B7C3] hover:text-white transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">{copiedLink ? 'Copied!' : 'Share'}</span>
                  </button>
                </div>
              </div>

              {/* 16:9 Video Container with official YouTube Playlist Embed */}
              <div className="video-container bg-black">
                <iframe
                  src={playlistEmbedUrl}
                  title="3C Church Previous Services - The Satisfied Life"
                  aria-label="3C Church Previous Services Playlist"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              {/* Player Bottom Description */}
              <div className="p-6 sm:p-8 bg-gradient-to-b from-[#0C101D] to-[#0A0D18]">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <span className="text-[11px] font-display font-semibold uppercase tracking-widest text-[#FF6B2C]">
                      Sermon Archive & Teaching Series
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                      The Satisfied Life — Sermon Series
                    </h2>
                    <p className="text-xs sm:text-sm text-[#B0B7C3] max-w-2xl leading-relaxed">
                      Watch previous services and message series from Pastor Bert Pretorius and guest speakers. Select an episode below or use the playlist drawer inside the video player to explore all messages.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setActiveTab('live')}
                      className="px-5 py-3 rounded-sm bg-[#FF6B2C] hover:bg-[#FF824D] text-[#080B12] text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-2 shadow-lg shadow-[#FF6B2C]/20"
                    >
                      <Radio className="w-4 h-4 animate-pulse" />
                      <span>WATCH LIVE SERVICE</span>
                    </button>

                    <a
                      href="https://www.youtube.com/@BertPretorius/playlists"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 rounded-sm bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors flex items-center gap-2"
                    >
                      <Youtube className="w-4 h-4 text-red-500" />
                      <span>All Playlists</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/50" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* "The Satisfied Life" Series Episodes Cards */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FF6B2C]" />
                    "The Satisfied Life" Series Episodes
                  </h3>
                  <p className="text-xs text-[#B0B7C3] mt-0.5">
                    Click any episode to play immediately in the player above.
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#FF6B2C] bg-[#FF6B2C]/10 border border-[#FF6B2C]/20 px-3 py-1 rounded-full">
                  Official Series
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {episodes.map((ep, i) => (
                  <div 
                    key={i}
                    className="p-5 rounded-lg bg-[#0F1424] border border-white/10 hover:border-[#FF6B2C]/40 transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-[#FF6B2C] uppercase tracking-wider">{ep.part}</span>
                        <span className="px-2 py-0.5 rounded-full bg-white/5 text-[#B0B7C3]">{ep.duration}</span>
                      </div>
                      <h4 className="text-base font-bold text-white group-hover:text-[#FF6B2C] transition-colors leading-snug">
                        {ep.title}
                      </h4>
                      <p className="text-xs text-white/70 font-medium">{ep.speaker}</p>
                      <p className="text-xs text-[#B0B7C3] leading-relaxed line-clamp-3">
                        {ep.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                      <button
                        onClick={() => {
                          if (ep.videoId) {
                            setSelectedVideoId(ep.videoId);
                          } else {
                            setSelectedVideoId(null);
                          }
                          window.scrollTo({ top: 200, behavior: 'smooth' });
                        }}
                        className="text-xs font-bold text-[#FF6B2C] hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Watch Sermon</span>
                      </button>

                      <span className="text-[10px] text-white/40">{ep.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Banner: Built on Christ, Open to Everyone */}
        <div className="mt-16 p-8 rounded-xl bg-gradient-to-r from-[#121829] via-[#0F1424] to-[#121829] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-display font-semibold uppercase tracking-widest text-[#FF6B2C]">
              Cornerstone Church
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-display text-white">
              Built on Christ, Open to Everyone
            </h3>
            <p className="text-xs text-[#B0B7C3]">
              Join us in-person or online. You belong here.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('visit')}
              className="px-5 py-2.5 rounded-sm bg-[#FF6B2C] hover:bg-[#FF824D] text-[#080B12] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Plan A Visit
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 rounded-sm bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Need Prayer?
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
