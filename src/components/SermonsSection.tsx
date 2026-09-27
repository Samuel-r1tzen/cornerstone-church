import React, { useState } from 'react';
import { FEATURED_SERMON, RECENT_SERMONS } from '../data/churchData';
import { Sermon } from '../types';
import { PencilHeading } from './PencilHeading';
import { MountainSermonFallback, SermonImageWithFallback } from './MountainSermonFallback';
import { SpotifyIcon } from './SocialIcons';
import { Play, BookOpen, Clock, Calendar, CheckCircle, Volume2, Share2, Sparkles } from 'lucide-react';

export const SermonsSection: React.FC = () => {
  const [activeSermon, setActiveSermon] = useState<Sermon>(FEATURED_SERMON);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = (sermon: Sermon) => {
    if (navigator.share) {
      navigator.share({
        title: sermon.title,
        text: `Listen to "${sermon.title}" from Cornerstone Church Centurion`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${sermon.title} - Cornerstone Church Centurion`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="sermons" className="py-20 lg:py-28 bg-[#070B16] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-display tracking-[0.2em] uppercase text-[#FF6B2C] mb-3">
              <span className="w-6 h-px bg-[#FF6B2C]" />
              Biblical Teaching
            </div>
            <PencilHeading text="LATEST SERMONS" dataPencil="sermons" maxWidth="640px" />
          </div>
          <p className="text-sm sm:text-base text-[#B0B7C3] max-w-md">
            Grounded in scripture, applied to practical modern life. Stream our Sunday messages or listen on your daily commute.
          </p>
        </div>

        {/* Featured Sermon Hero Card */}
        <div className="bg-[#0A0F1F] rounded-2xl border border-white/10 overflow-hidden shadow-2xl mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Media Showcase */}
            <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[420px] bg-black">
              {activeSermon.imageUrl ? (
                <img
                  src={activeSermon.imageUrl}
                  alt={activeSermon.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-[0.8] contrast-105"
                />
              ) : (
                <MountainSermonFallback size="hero" className="w-full h-full min-h-[320px] sm:min-h-[420px]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1F] via-transparent to-transparent opacity-90 pointer-events-none" />
              
              {/* Play Overlay Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 rounded-full bg-[#FF6B2C] hover:bg-[#FF824D] text-[#080B12] flex items-center justify-center shadow-2xl shadow-[#FF6B2C]/50 hover:scale-110 transition-all duration-300 group cursor-pointer z-10"
                  aria-label="Play sermon message"
                >
                  <Play className="w-8 h-8 fill-current ml-1 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Badges */}
              <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
                <span className="bg-[#FF6B2C] text-[#080B12] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Featured Message
                </span>
                <span className="bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/10">
                  Series: {activeSermon.series}
                </span>
              </div>

              {/* Status bar */}
              {isPlaying && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-lg border border-white/15 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Streaming Audio: {activeSermon.title}</span>
                  </div>
                  <span className="text-[#FF6B2C] font-mono">{activeSermon.duration}</span>
                </div>
              )}
            </div>

            {/* Sermon Details & Study Notes */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-3 text-xs text-[#B0B7C3] mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#FF6B2C]" />
                    {activeSermon.date}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FF6B2C]" />
                    {activeSermon.duration}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2 leading-snug">
                  {activeSermon.title}
                </h3>

                <p className="text-sm font-semibold text-[#FF6B2C] mb-3">
                  {activeSermon.speaker} · <span className="text-[#B0B7C3] font-normal">{activeSermon.speakerRole}</span>
                </p>

                <div className="bg-white/[0.03] p-3 rounded-lg border border-white/5 mb-4 text-xs text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#FF6B2C] shrink-0" />
                  <span>Scripture: <strong>{activeSermon.scripture}</strong></span>
                </div>

                <p className="text-sm text-[#B0B7C3] leading-relaxed mb-4">
                  {activeSermon.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {activeSermon.tags.map((tag, i) => (
                    <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 text-[#B0B7C3] border border-white/10">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex-1 py-3 px-4 rounded-sm bg-[#FF6B2C] hover:bg-[#FF824D] text-[#080B12] font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-[#FF6B2C]/20"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isPlaying ? 'Pause Sermon' : 'Listen Now'}</span>
                </button>

                <a
                  href="https://open.spotify.com/show/2wLFiZpfXw2hLztyAz4a9K"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Listen to 3C Church on Spotify"
                  className="py-3 px-4 rounded-sm bg-[#1ED760]/10 hover:bg-[#1ED760]/20 border border-[#1ED760]/30 hover:border-[#1ED760]/60 text-[#1ED760] hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  title="Listen to 3C Church on Spotify"
                >
                  <SpotifyIcon className="w-4 h-4 fill-current" />
                  <span className="hidden sm:inline">Spotify</span>
                </a>

                <button
                  onClick={() => handleShare(activeSermon)}
                  className="py-3 px-4 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Share'}</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Sermon Archive Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RECENT_SERMONS.map((sermon) => {
            const isCurrent = activeSermon.id === sermon.id;
            return (
              <div
                key={sermon.id}
                onClick={() => {
                  setActiveSermon(sermon);
                  setIsPlaying(false);
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                  isCurrent 
                    ? 'bg-white/10 border-[#FF6B2C]' 
                    : 'bg-[#0A0F1F] border-white/10 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="relative w-20 h-16 rounded overflow-hidden shrink-0">
                  <SermonImageWithFallback 
                    src={sermon.imageUrl} 
                    alt={sermon.title} 
                    title={sermon.title}
                    thumbnailClassName="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-[#FF6B2C] font-mono block">
                    {sermon.date} · {sermon.duration}
                  </span>
                  <h4 className="font-display font-semibold text-sm text-white truncate">
                    {sermon.title}
                  </h4>
                  <p className="text-xs text-[#B0B7C3] truncate">
                    {sermon.speaker}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
