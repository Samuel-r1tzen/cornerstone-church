import React, { useState } from 'react';
import { CHURCH_TESTIMONIALS } from '../data/churchData';
import { PencilHeading } from './PencilHeading';
import { TestimonialItem, PageId } from '../types';
import { 
  Quote, 
  Heart, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle, 
  UserCheck, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

interface TestimoniesSectionProps {
  onNavigate?: (page: PageId, options?: { initialType?: any; initialMessage?: string }) => void;
  className?: string;
}

export const TestimoniesSection: React.FC<TestimoniesSectionProps> = ({
  onNavigate,
  className = ''
}) => {
  const [selectedId, setSelectedId] = useState<string>(CHURCH_TESTIMONIALS[0].id);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [showFullModal, setShowFullModal] = useState<boolean>(false);

  const filterTags = ['All', 'Young Adults', 'Family & Kids', 'Outreach & Purpose', 'Youth & Students', 'Healing & Faith'];

  const filteredTestimonials = activeFilter === 'All'
    ? CHURCH_TESTIMONIALS
    : CHURCH_TESTIMONIALS.filter((t) => t.tag.toLowerCase().includes(activeFilter.toLowerCase()) || activeFilter.toLowerCase().includes(t.tag.toLowerCase()));

  const activeTestimony = CHURCH_TESTIMONIALS.find((t) => t.id === selectedId) || CHURCH_TESTIMONIALS[0];

  const handleNext = () => {
    const currentIndex = CHURCH_TESTIMONIALS.findIndex((t) => t.id === activeTestimony.id);
    const nextIndex = (currentIndex + 1) % CHURCH_TESTIMONIALS.length;
    setSelectedId(CHURCH_TESTIMONIALS[nextIndex].id);
  };

  const handlePrev = () => {
    const currentIndex = CHURCH_TESTIMONIALS.findIndex((t) => t.id === activeTestimony.id);
    const prevIndex = (currentIndex - 1 + CHURCH_TESTIMONIALS.length) % CHURCH_TESTIMONIALS.length;
    setSelectedId(CHURCH_TESTIMONIALS[prevIndex].id);
  };

  const handleShareStory = () => {
    onNavigate?.('contact', {
      initialType: 'general',
      initialMessage: 'Hi Cornerstone Team! I would love to share a testimony of what God has done in my life / family through our church community.'
    });
  };

  return (
    <section id="testimonials" className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <PencilHeading text="LIVES CHANGED" dataPencil="testimonials" maxWidth="560px" />
          <p className="text-[11px] font-display tracking-[0.2em] uppercase text-[#B0B7C3] flex items-center gap-3 mt-2">
            <span className="w-8 h-px bg-[#FF6B2C]" />
            Real stories of faith, community, and purpose
          </p>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            aria-label="Previous story"
            className="w-10 h-10 rounded-sm border border-white/10 hover:border-[#FF6B2C] bg-[#0A0F1F] flex items-center justify-center text-white hover:text-[#FF6B2C] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next story"
            className="w-10 h-10 rounded-sm border border-white/10 hover:border-[#FF6B2C] bg-[#0A0F1F] flex items-center justify-center text-white hover:text-[#FF6B2C] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {filterTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={`px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeFilter === tag
                ? 'bg-[#FF6B2C] text-[#080B12] shadow-md shadow-[#FF6B2C]/20'
                : 'bg-[#0A0F1F] text-[#B0B7C3] hover:text-white border border-white/10'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Featured Highlight Card */}
      <div className="bg-[#0A0F1F] border border-white/10 rounded-xl overflow-hidden relative shadow-2xl mb-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B2C]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12 relative z-10">
          
          {/* Member Photo */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
            <div className="relative group">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-xl overflow-hidden border-2 border-[#FF6B2C]/40 shadow-2xl relative">
                <img
                  src={activeTestimony.image}
                  alt={activeTestimony.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B12]/80 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-[#FF6B2C] text-[#080B12] flex items-center justify-center font-bold shadow-lg">
                <Quote className="w-5 h-5 fill-current" />
              </div>
            </div>

            <div className="mt-5 text-center sm:text-left">
              <h3 className="font-display font-bold text-xl text-white">
                {activeTestimony.name}
              </h3>
              <p className="text-xs text-[#FF6B2C] font-semibold mt-0.5">
                {activeTestimony.roleOrMinistry}
              </p>
              <p className="text-[11px] text-[#B0B7C3]/60 mt-1">
                {activeTestimony.yearsAtChurch}
              </p>
            </div>
          </div>

          {/* Testimonial Quote & Context */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 text-xs font-semibold text-[#FF6B2C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeTestimony.storyTitle}</span>
            </div>

            <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl text-[#F5F2EE] font-light leading-relaxed">
              "{activeTestimony.quote}"
            </blockquote>

            {activeTestimony.fullStory && (
              <p className="text-xs sm:text-sm text-[#B0B7C3] leading-relaxed border-l-2 border-[#FF6B2C] pl-4">
                {activeTestimony.fullStory}
              </p>
            )}

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={handleShareStory}
                className="btn btn-primary text-xs"
              >
                <span>Share Your Story</span>
                <span className="arrow">→</span>
              </button>

              <button
                onClick={() => onNavigate?.('visit')}
                className="text-xs font-bold text-[#B0B7C3] hover:text-[#FF6B2C] uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Experience Our Community This Sunday</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Story Grid / Thumbnails (Switch stories easily) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CHURCH_TESTIMONIALS.map((t) => {
          const isSelected = t.id === activeTestimony.id;
          return (
            <div
              key={t.id}
              onClick={() => setSelectedId(t.id)}
              className={`p-4.5 rounded-sm border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#0F1424] border-[#FF6B2C] shadow-lg shadow-[#FF6B2C]/10 -translate-y-1'
                  : 'bg-[#080B12]/80 border-white/10 hover:border-white/20 hover:bg-[#0A0F1F]'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#FF6B2C]/30"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-display font-bold text-sm text-white">{t.name}</h4>
                    <span className="text-[10px] text-[#FF6B2C] uppercase tracking-wider font-semibold block">
                      {t.tag}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#B0B7C3] line-clamp-3 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-[#B0B7C3]/60">{t.yearsAtChurch}</span>
                <span className={`font-semibold ${isSelected ? 'text-[#FF6B2C]' : 'text-[#B0B7C3] group-hover:text-white'}`}>
                  {isSelected ? 'Viewing' : 'Read Story →'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Community Banner Callout */}
      <div className="mt-12 bg-[#0F1424]/80 border border-white/10 p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-display font-bold text-lg text-white">
            Has God done something powerful in your life at Cornerstone?
          </h4>
          <p className="text-xs sm:text-sm text-[#B0B7C3]">
            Every story of healing, reconciliation, and salvation encourages someone else in their faith walk.
          </p>
        </div>

        <button
          onClick={handleShareStory}
          className="btn btn-primary shrink-0 whitespace-nowrap"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Submit Your Story</span>
        </button>
      </div>

    </section>
  );
};
