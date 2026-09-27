import React, { useState } from 'react';
import { PageId } from '../types';
import { churchApi } from '../services/api';
import { MapPin, Phone, Mail, ArrowUp, Send, CheckCircle, ShieldCheck } from 'lucide-react';
import { SocialMediaRow } from './SocialIcons';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onPlanVisit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onPlanVisit }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [newsletterMsg, setNewsletterMsg] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribing(true);
    try {
      const res = await churchApi.subscribeNewsletter(newsletterEmail, 'footer');
      setNewsletterMsg(res.message);
      setNewsletterEmail('');
    } catch (err: any) {
      setNewsletterMsg(err.message || 'Could not subscribe. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05080E] text-[#B0B7C3] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-display font-bold text-lg sm:text-xl tracking-wider text-white block">
                CORNERSTONE CHURCH
              </span>
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#B0B7C3] block font-medium">
                Faith · People · Purpose
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#B0B7C3] leading-relaxed max-w-sm">
              A Christ-centred family of believers in Centurion, South Africa. Committed to loving God, loving people, and discipling the next generation.
            </p>

            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-display uppercase tracking-widest text-[#FF6B2C] block font-semibold">
                Follow Us Online
              </span>
              <SocialMediaRow variant="icons" iconClassName="w-4 h-4" />
            </div>

            <div className="pt-2">
              <button
                onClick={onPlanVisit}
                className="py-2.5 px-4 rounded-sm bg-[#FF6B2C] hover:bg-[#FF824D] text-[#080B12] font-bold text-xs transition-colors shadow-md shadow-[#FF6B2C]/20 cursor-pointer"
              >
                Plan Your Sunday Visit
              </button>
            </div>
          </div>

          {/* Dedicated Pages Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Explore Pages
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#FF6B2C] transition-colors cursor-pointer text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('visit')} className="hover:text-[#FF6B2C] transition-colors cursor-pointer text-left">
                  Plan A Visit
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-[#FF6B2C] transition-colors cursor-pointer text-left">
                  Our Story & Beliefs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ministries')} className="hover:text-[#FF6B2C] transition-colors cursor-pointer text-left">
                  Ministries & Communities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sermons')} className="hover:text-[#FF6B2C] transition-colors cursor-pointer text-left">
                  Sermons & Media
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-[#FF6B2C] transition-colors cursor-pointer text-left">
                  Upcoming Events
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-[#FF6B2C] transition-colors cursor-pointer text-left">
                  Member Testimonies
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-[#FF6B2C] transition-colors cursor-pointer text-left">
                  Visitor & Ministry FAQs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#FF6B2C] transition-colors cursor-pointer text-left">
                  Contact & Prayer
                </button>
              </li>
              <li className="pt-2 border-t border-white/5">
                <button 
                  onClick={() => onNavigate('admin')} 
                  className="text-[11px] text-[#FF6B2C] hover:text-[#FF824D] transition-colors cursor-pointer text-left flex items-center gap-1.5 font-semibold"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B2C]" />
                  <span>Pastoral Staff Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Gatherings */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Sunday Services
            </h4>
            <div className="space-y-2 text-xs">
              <p><strong className="text-white">09:00 AM</strong> — Classic & Kids Church</p>
              <p><strong className="text-white">11:00 AM</strong> — Modern & Young Adults</p>
              <p><strong className="text-white">17:30 PM</strong> — Acoustic Encounter</p>
              <p className="pt-2 text-[11px] text-[#FF6B2C]">Cornerstone Kids Check-In open 20 mins before service.</p>
            </div>
          </div>

          {/* Connect & Contact */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Centurion Campus
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF6B2C] mt-0.5 shrink-0" />
                <span>123 Church St, Lyttelton Manor, Centurion</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FF6B2C]" />
                <span>+27 12 345 6789</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FF6B2C]" />
                <span>hello@cornerstonechurch.co.za</span>
              </p>
            </div>
          </div>

        </div>

        {/* Newsletter Subscription Row */}
        <div className="py-8 my-8 border-y border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#FF6B2C]" />
              Stay Connected With Cornerstone Weekly
            </h4>
            <p className="text-xs text-[#B0B7C3]">
              Receive weekly sermon notes, upcoming church family events, and devotional reflections.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex-1 max-w-md flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="bg-[#0A0F1F] border border-white/15 focus:border-[#FF6B2C] text-xs text-white rounded px-3 py-2 flex-1 focus:outline-none placeholder-[#B0B7C3]/50"
            />
            <button
              type="submit"
              disabled={isSubscribing}
              className="bg-[#FF6B2C] hover:bg-[#FF824D] text-[#080B12] text-xs font-bold px-4 py-2 rounded uppercase tracking-wider transition-colors shrink-0 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>

        {newsletterMsg && (
          <div className="mb-6 p-3 rounded bg-[#0A0F1F] border border-[#FF6B2C]/30 text-xs text-emerald-400 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#FF6B2C] shrink-0" />
            <span>{newsletterMsg}</span>
          </div>
        )}

        {/* Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
          <p>© {new Date().getFullYear()} Cornerstone Church Centurion. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <SocialMediaRow variant="minimal" iconClassName="w-4 h-4" />
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs text-[#B0B7C3] hover:text-[#FF6B2C] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
