import React, { useState, useMemo } from 'react';
import { CHURCH_FAQS } from '../data/churchData';
import { PencilHeading } from './PencilHeading';
import { PageId } from '../types';
import { 
  ChevronDown, 
  Search, 
  HelpCircle, 
  MessageSquare, 
  Calendar, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface FaqSectionProps {
  onNavigate?: (page: PageId) => void;
  onPlanVisit?: () => void;
  title?: string;
  subtitle?: string;
  initialCategory?: string;
  className?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  onNavigate,
  onPlanVisit,
  title = "COMMON QUESTIONS",
  subtitle = "Everything you need to know about visiting, services & ministries",
  initialCategory = 'All',
  className = ''
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // First item open by default

  const categories = ['All', 'First Visit', 'Services', 'Kids & Family', 'Ministries', 'Connect', 'Giving'];

  const filteredFaqs = useMemo(() => {
    return CHURCH_FAQS.filter((faq) => {
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (index: number) => {
    setOpenIndexes((prev) => 
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const expandAll = () => {
    setOpenIndexes(filteredFaqs.map((_, idx) => idx));
  };

  const collapseAll = () => {
    setOpenIndexes([]);
  };

  return (
    <section id="faq" className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <PencilHeading text={title} dataPencil="faq" maxWidth="680px" />
          <p className="text-[11px] font-display tracking-[0.2em] uppercase text-[#B0B7C3] flex items-center gap-3 mt-2">
            <span className="w-8 h-px bg-[#FF6B2C]" />
            {subtitle}
          </p>
        </div>

        {/* Quick Expand / Collapse All control */}
        <div className="flex items-center gap-4 text-xs font-semibold text-[#B0B7C3]">
          <button 
            onClick={expandAll}
            className="hover:text-[#FF6B2C] transition-colors cursor-pointer"
          >
            Expand All
          </button>
          <span className="text-white/20">|</span>
          <button 
            onClick={collapseAll}
            className="hover:text-[#FF6B2C] transition-colors cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Search Bar & Category Filters */}
      <div className="mb-10 space-y-4">
        {/* Search input */}
        <div className="relative max-w-xl">
          <Search className="w-4 h-4 text-[#B0B7C3] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. kids, parking, time, communion, life groups)..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#0A0F1F] border border-white/10 rounded-sm text-sm text-white placeholder-[#B0B7C3]/50 focus:outline-none focus:border-[#FF6B2C] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#B0B7C3] hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#FF6B2C] text-[#080B12] shadow-md shadow-[#FF6B2C]/20'
                  : 'bg-[#0A0F1F] text-[#B0B7C3] hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List + Support Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Accordion list (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-[#0A0F1F] border border-white/10 rounded-lg p-10 text-center space-y-4">
              <HelpCircle className="w-10 h-10 text-[#FF6B2C] mx-auto opacity-75" />
              <h4 className="font-display text-lg font-bold text-white">No matching questions found</h4>
              <p className="text-xs text-[#B0B7C3] max-w-sm mx-auto">
                We couldn’t find an answer matching "{searchQuery}". Send us a quick note and our pastoral team will answer directly!
              </p>
              <button
                onClick={() => onNavigate?.('contact')}
                className="btn btn-primary"
              >
                <span>Ask Us Directly</span>
                <span className="arrow">→</span>
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndexes.includes(index);
              return (
                <div
                  key={index}
                  className={`border transition-all duration-300 rounded-sm overflow-hidden ${
                    isOpen
                      ? 'bg-[#0A0F1F] border-[#FF6B2C]/60 shadow-lg shadow-[#FF6B2C]/5'
                      : 'bg-[#080B12]/80 hover:bg-[#0A0F1F] border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-5 sm:px-6 py-4.5 flex items-center justify-between gap-4 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-[#FF6B2C] bg-[#FF6B2C]/10 px-2 py-0.5 rounded-xs shrink-0 uppercase tracking-widest font-bold">
                        {faq.category}
                      </span>
                      <span className={`font-display text-sm sm:text-base font-bold transition-colors ${
                        isOpen ? 'text-[#FF6B2C]' : 'text-[#F5F2EE] group-hover:text-white'
                      }`}>
                        {faq.question}
                      </span>
                    </div>

                    <div className={`w-7 h-7 rounded-full flex items-center justify-center border transition-transform duration-300 shrink-0 ${
                      isOpen 
                        ? 'border-[#FF6B2C] bg-[#FF6B2C]/10 text-[#FF6B2C] rotate-180' 
                        : 'border-white/10 text-[#B0B7C3] group-hover:border-white/30 group-hover:text-white'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Body */}
                  <div 
                    className={`transition-all duration-300 ease-in-out px-5 sm:px-6 ${
                      isOpen 
                        ? 'max-h-96 opacity-100 pb-5 pt-1 border-t border-white/5' 
                        : 'max-h-0 opacity-0 overflow-hidden py-0'
                    }`}
                  >
                    <p className="text-xs sm:text-sm text-[#B0B7C3] leading-relaxed pt-2">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right: Quick Help Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0A0F1F] border border-white/10 p-6 sm:p-7 rounded-sm relative overflow-hidden space-y-5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B2C]/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="w-10 h-10 rounded-sm bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 flex items-center justify-center text-[#FF6B2C]">
              <Sparkles className="w-5 h-5" />
            </div>

            <div>
              <span className="text-[10px] font-display uppercase tracking-widest text-[#FF6B2C] block font-semibold mb-1">
                Guest Hospitality
              </span>
              <h4 className="font-display text-lg font-bold text-white leading-tight">
                Planning to visit this coming Sunday?
              </h4>
              <p className="text-xs text-[#B0B7C3] leading-relaxed mt-2">
                Let us know in advance and our host team will meet you at the door, show you to seats, and treat you to coffee.
              </p>
            </div>

            <div className="space-y-2 pt-2 text-xs text-[#F5F2EE]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" />
                <span>Dedicated front-row guest parking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" />
                <span>Pre-registered secure kids check-in</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2C]" />
                <span>Free barista coffee & welcome pack</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={onPlanVisit}
                className="btn btn-primary w-full justify-center"
              >
                <span>Plan Your Sunday</span>
                <span className="arrow">→</span>
              </button>

              <button
                onClick={() => onNavigate?.('contact')}
                className="btn w-full justify-center text-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ask A Question</span>
              </button>
            </div>
          </div>

          <div className="bg-[#080B12] border border-white/10 p-5 rounded-sm flex items-center justify-between text-xs text-[#B0B7C3]">
            <div>
              <p className="font-semibold text-white">Need immediate prayer?</p>
              <p className="text-[11px] text-[#B0B7C3]/80">Our prayer chain prays daily.</p>
            </div>
            <button
              onClick={() => onNavigate?.('contact')}
              className="text-[#FF6B2C] hover:text-white font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Submit Request</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
