import React, { useEffect, useRef } from 'react';
import { PageId } from '../types';
import { PencilHeading } from '../components/PencilHeading';
import { ContactSection } from '../components/ContactSection';
import { FaqSection } from '../components/FaqSection';
import { TestimoniesSection } from '../components/TestimoniesSection';
import { SocialMediaRow } from '../components/SocialIcons';
import { EventImageWithFallback } from '../components/WorshipEventFallback';
import { 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Clock, 
  Coffee, 
  Users, 
  ShieldCheck, 
  Heart,
  Compass
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onPlanVisit: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onPlanVisit }) => {
  const heroBgRef = useRef<HTMLDivElement>(null);

  // Scroll reveal system + stat counter animation + hero parallax
  useEffect(() => {
    // 1. Intersection Observer for all data-reveal elements
    const revealElements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.add('revealed');

          const statNumber = el.querySelector('.stat-number') as HTMLElement | null;
          if (statNumber && !statNumber.dataset.counted) {
            statNumber.dataset.counted = 'true';
            const target = parseInt(statNumber.getAttribute('data-target') || '0', 10);
            const duration = 1800;
            const startTime = performance.now();

            const animateCount = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Eased quad out
              const eased = 1 - (1 - progress) * (1 - progress);
              const current = Math.floor(eased * target);
              statNumber.textContent = current.toLocaleString();
              if (progress < 1) {
                requestAnimationFrame(animateCount);
              } else {
                statNumber.textContent = target.toLocaleString();
              }
            };
            requestAnimationFrame(animateCount);
          }
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach((el) => observer.observe(el));

    // 2. Hero parallax on scroll
    const handleScroll = () => {
      if (heroBgRef.current && window.scrollY < window.innerHeight) {
        heroBgRef.current.style.transform = `scale(1.05) translateY(${window.scrollY * 0.14}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="space-y-24 sm:space-y-32">

      {/* ============================================================
          HERO SECTION (High visual impact, less wordy)
         ============================================================ */}
      <section id="hero" className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Dynamic Parallax Background - Clear, vibrant, luminous worship sanctuary */}
        <div 
          ref={heroBgRef}
          className="absolute inset-[-10%] z-0 bg-cover bg-center transition-transform duration-100 ease-out will-change-transform"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=2070&q=85')",
            filter: 'brightness(0.65) contrast(1.08) saturate(1.15)'
          }}
        />

        {/* Ambient Dark Gradient Overlays - balanced for high image clarity + text legibility */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `
              linear-gradient(180deg, rgba(8, 11, 18, 0.65) 0%, rgba(8, 11, 18, 0.25) 35%, rgba(8, 11, 18, 0.75) 85%, rgba(8, 11, 18, 0.95) 100%),
              radial-gradient(ellipse at 50% 45%, rgba(8, 11, 18, 0.1) 0%, rgba(8, 11, 18, 0.6) 100%)
            `
          }}
        />

        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-start sm:items-center text-left sm:text-center space-y-6 sm:space-y-8">
          
          <p className="text-xs sm:text-sm font-display tracking-[0.25em] uppercase text-[#FF6B2C] font-semibold flex items-center gap-2">
            <span className="w-6 h-px bg-[#FF6B2C] sm:hidden" />
            Matthew 28:19–20
          </p>

          <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-[0.95] max-w-4xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            GO AND MAKE <br className="hidden sm:inline" />
            <span className="text-[#FF6B2C]">DISCIPLES</span>
          </h1>

          <p className="text-sm sm:text-lg text-[#F0F3F8] max-w-2xl font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            A Christ-centred community in Centurion, South Africa — passionate about faith, people, and purpose. Come as you are.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              onClick={onPlanVisit}
              className="btn btn-primary cursor-pointer shadow-xl shadow-[#FF6B2C]/20"
            >
              <span>Plan Your Visit</span>
              <span className="arrow">→</span>
            </button>
            <button 
              onClick={() => onNavigate('sermons')}
              className="btn cursor-pointer bg-black/40 backdrop-blur-md border-white/20 hover:border-white/50"
            >
              <span>Watch Online</span>
              <span className="arrow">→</span>
            </button>
          </div>

        </div>
      </section>

      {/* ============================================================
          OUR STORY (Concise, punchy, less wordy)
         ============================================================ */}
      <section id="story" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <PencilHeading text="OUR STORY" dataPencil="story" maxWidth="480px" />
          <p className="text-[11px] font-display tracking-[0.2em] uppercase text-[#B0B7C3] flex items-center gap-3 mt-2">
            <span className="w-8 h-px bg-[#FF6B2C]" />
            Who We Are
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="story-image" data-reveal="clip">
            <img 
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85" 
              alt="Cornerstone Church Community in Fellowship" 
              className="w-full h-[420px] sm:h-[480px] object-cover rounded-sm shadow-2xl filter brightness-95"
              loading="lazy" 
            />
          </div>

          <div className="space-y-6" data-reveal="text">
            <p className="text-base sm:text-lg text-[#F5F2EE] leading-relaxed">
              Cornerstone Church is a family of believers passionate about seeing people encounter the living God. Faith is not a destination, but a journey meant to be walked together.
            </p>
            <p className="text-sm sm:text-base text-[#B0B7C3] leading-relaxed">
              We are Christ-centred, Spirit-led, and people-focused. Whether you are exploring faith for the first time or walking with Jesus for years, there is a place for you here.
            </p>
            <p className="text-sm sm:text-base text-[#B0B7C3] leading-relaxed">
              Our heart is simple: love God, love people, and make disciples who make a difference in their world.
            </p>

            <ul className="space-y-2.5 pt-2 border-t border-white/10 text-xs sm:text-sm text-[#B0B7C3]">
              <li className="flex items-center gap-2.5">
                <span className="text-[#FF6B2C]">▸</span>
                <span>We believe in the Trinity — Father, Son, and Holy Spirit.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-[#FF6B2C]">▸</span>
                <span>We believe the Bible is God’s inspired and authoritative Word.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-[#FF6B2C]">▸</span>
                <span>We believe salvation is by grace through faith in Jesus Christ alone.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-[#FF6B2C]">▸</span>
                <span>We believe in the transformative power of the Holy Spirit.</span>
              </li>
            </ul>

            <div className="pt-4">
              <button 
                onClick={() => onNavigate('story')}
                className="text-xs font-bold text-[#FF6B2C] hover:text-white uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Read Full Story & Leadership Team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          JOIN US / SUNDAY GATHERINGS
         ============================================================ */}
      <section id="join" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <PencilHeading text="JOIN US" dataPencil="join" maxWidth="360px" />
          <p className="text-[11px] font-display tracking-[0.2em] uppercase text-[#B0B7C3] flex items-center gap-3 mt-2">
            <span className="w-8 h-px bg-[#FF6B2C]" />
            When and where to find us
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sanctuary Visual + Times */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-sm overflow-hidden" data-reveal="clip">
              <img 
                src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=1200&q=85" 
                alt="Main Sanctuary Centurion" 
                className="w-full h-72 sm:h-80 object-cover filter brightness-[0.92] contrast-[1.04]"
                loading="lazy"
              />
              <span className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#080B12] via-[#080B12]/70 to-transparent font-display text-xs tracking-widest uppercase text-[#FF6B2C]">
                Our Sanctuary · Centurion
              </span>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-baseline gap-6 pb-4 border-b border-white/10">
                <span className="font-display font-bold text-3xl sm:text-4xl text-[#FF6B2C] min-w-[5.5rem]">09:00</span>
                <div>
                  <h3 className="font-display font-semibold text-base sm:text-lg text-white">Classic Service & Kids Church</h3>
                  <p className="text-xs text-[#B0B7C3]">Sunday Morning · Main Sanctuary & Children's Ministry</p>
                </div>
              </div>

              <div className="flex items-baseline gap-6 pb-4 border-b border-white/10">
                <span className="font-display font-bold text-3xl sm:text-4xl text-[#FF6B2C] min-w-[5.5rem]">11:00</span>
                <div>
                  <h3 className="font-display font-semibold text-base sm:text-lg text-white">Contemporary Praise</h3>
                  <p className="text-xs text-[#B0B7C3]">Sunday Morning · High energy worship & community lounge</p>
                </div>
              </div>

              <div className="flex items-baseline gap-6 pb-4 border-b border-white/10">
                <span className="font-display font-bold text-3xl sm:text-4xl text-[#FF6B2C] min-w-[5.5rem]">18:30</span>
                <div>
                  <h3 className="font-display font-semibold text-base sm:text-lg text-white">Youth & Young Adults</h3>
                  <p className="text-xs text-[#B0B7C3]">Friday Evening · Youth Hall gathering & campfire fellowship</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Hospitality Blocks */}
          <div className="lg:col-span-5 space-y-4" data-reveal="text">
            <div className="p-6 rounded-sm bg-[#0A0F1F] border border-white/10 space-y-2">
              <span className="text-[10px] font-display tracking-[0.2em] uppercase text-[#FF6B2C] block">
                Location
              </span>
              <p className="text-sm text-white font-medium">123 Church Street, Lyttelton Manor</p>
              <p className="text-xs text-[#B0B7C3]">Centurion, 0157, South Africa</p>
            </div>

            <div className="p-6 rounded-sm bg-[#0A0F1F] border border-white/10 space-y-2">
              <span className="text-[10px] font-display tracking-[0.2em] uppercase text-[#FF6B2C] block">
                Parking & Accessibility
              </span>
              <p className="text-xs text-[#B0B7C3] leading-relaxed">
                Free secure parking on-site with friendly car parking hosts and wheelchair-friendly entrances.
              </p>
            </div>

            <div className="p-6 rounded-sm bg-[#0A0F1F] border border-white/10 space-y-2">
              <span className="text-[10px] font-display tracking-[0.2em] uppercase text-[#FF6B2C] block">
                What to Expect
              </span>
              <p className="text-xs text-[#B0B7C3] leading-relaxed">
                Authentic worship, 75-minute services, practical scripture teaching, complimentary artisan coffee, and welcoming hosts.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onPlanVisit}
                className="btn btn-primary w-full justify-center cursor-pointer"
              >
                <span>Plan Your Visit Guide</span>
                <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MINISTRIES (Find Your Place - 6 Clean Cards)
         ============================================================ */}
      <section id="ministries" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <PencilHeading text="FIND YOUR PLACE" dataPencil="ministries" maxWidth="700px" />
            <p className="text-[11px] font-display tracking-[0.2em] uppercase text-[#B0B7C3] flex items-center gap-3 mt-2">
              <span className="w-8 h-px bg-[#FF6B2C]" />
              Find your community
            </p>
          </div>

          <button
            onClick={() => onNavigate('ministries')}
            className="text-xs font-semibold text-[#FF6B2C] hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Explore All Ministries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Children */}
          <article 
            onClick={() => onNavigate('ministries')}
            className="ministry-card aspect-[4/5]" 
            data-reveal="card"
          >
            <img src="https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Children's ministry" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/40 to-transparent flex flex-col justify-end p-6">
              <h3 className="font-display text-xl font-bold text-white mb-1">Children</h3>
              <p className="text-xs text-[#B0B7C3] line-clamp-2">Nurturing the next generation in a fun, safe, and faith-filled environment.</p>
            </div>
            <div className="card-arrow">→</div>
          </article>

          {/* 2. Youth */}
          <article 
            onClick={() => onNavigate('ministries')}
            className="ministry-card aspect-[4/5]" 
            data-reveal="card"
          >
            <img src="https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Youth ministry" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/40 to-transparent flex flex-col justify-end p-6">
              <h3 className="font-display text-xl font-bold text-white mb-1">Youth</h3>
              <p className="text-xs text-[#B0B7C3] line-clamp-2">Empowering teens to live boldly for Christ and build lasting friendships.</p>
            </div>
            <div className="card-arrow">→</div>
          </article>

          {/* 3. Young Adults */}
          <article 
            onClick={() => onNavigate('ministries')}
            className="ministry-card aspect-[4/5]" 
            data-reveal="card"
          >
            <img src="https://images.pexels.com/photos/8815059/pexels-photo-8815059.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Young adults ministry" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/40 to-transparent flex flex-col justify-end p-6">
              <h3 className="font-display text-xl font-bold text-white mb-1">Young Adults</h3>
              <p className="text-xs text-[#B0B7C3] line-clamp-2">A community for university students and young professionals to grow together.</p>
            </div>
            <div className="card-arrow">→</div>
          </article>

          {/* 4. Worship */}
          <article 
            onClick={() => onNavigate('ministries')}
            className="ministry-card aspect-[4/5]" 
            data-reveal="card"
          >
            <img src="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Worship ministry" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/40 to-transparent flex flex-col justify-end p-6">
              <h3 className="font-display text-xl font-bold text-white mb-1">Worship & Creative</h3>
              <p className="text-xs text-[#B0B7C3] line-clamp-2">Leading the congregation into the presence of God through music and media.</p>
            </div>
            <div className="card-arrow">→</div>
          </article>

          {/* 5. Prayer */}
          <article 
            onClick={() => onNavigate('ministries')}
            className="ministry-card aspect-[4/5]" 
            data-reveal="card"
          >
            <img src="https://images.pexels.com/photos/6146929/pexels-photo-6146929.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Prayer ministry" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/40 to-transparent flex flex-col justify-end p-6">
              <h3 className="font-display text-xl font-bold text-white mb-1">Prayer & Care</h3>
              <p className="text-xs text-[#B0B7C3] line-clamp-2">Standing in the gap for our church family, community, and city through intercession.</p>
            </div>
            <div className="card-arrow">→</div>
          </article>

          {/* 6. Outreach */}
          <article 
            onClick={() => onNavigate('ministries')}
            className="ministry-card aspect-[4/5]" 
            data-reveal="card"
          >
            <img src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Outreach ministry" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/40 to-transparent flex flex-col justify-end p-6">
              <h3 className="font-display text-xl font-bold text-white mb-1">Community Outreach</h3>
              <p className="text-xs text-[#B0B7C3] line-clamp-2">Serving Centurion with practical care, food relief, and the tangible hope of Christ.</p>
            </div>
            <div className="card-arrow">→</div>
          </article>
        </div>
      </section>

      {/* ============================================================
          EXPERIENCE (Come As You Are - 4 Clean Pillars)
         ============================================================ */}
      <section id="experience" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <PencilHeading text="COME AS YOU ARE" dataPencil="experience" maxWidth="720px" />
          <p className="text-[11px] font-display tracking-[0.2em] uppercase text-[#B0B7C3] flex items-center gap-3 mt-2">
            <span className="w-8 h-px bg-[#FF6B2C]" />
            What to expect
          </p>
        </div>

        <div className="space-y-0">
          <div className="experience-item" data-reveal="exp">
            <span className="font-display text-xs text-[#FF6B2C] tracking-widest min-w-[2.5rem]">01</span>
            <h3 className="exp-title font-display text-2xl sm:text-4xl font-bold text-white flex-1 transition-all">
              WORSHIP
            </h3>
            <p className="text-xs sm:text-sm text-[#B0B7C3] max-w-sm sm:text-right">
              Experience passionate, Christ-centred worship led with excellence and authenticity.
            </p>
          </div>

          <div className="experience-item" data-reveal="exp">
            <span className="font-display text-xs text-[#FF6B2C] tracking-widest min-w-[2.5rem]">02</span>
            <h3 className="exp-title font-display text-2xl sm:text-4xl font-bold text-white flex-1 transition-all">
              CONNECT
            </h3>
            <p className="text-xs sm:text-sm text-[#B0B7C3] max-w-sm sm:text-right">
              Find your people and build meaningful, lifelong relationships in intentional small groups.
            </p>
          </div>

          <div className="experience-item" data-reveal="exp">
            <span className="font-display text-xs text-[#FF6B2C] tracking-widest min-w-[2.5rem]">03</span>
            <h3 className="exp-title font-display text-2xl sm:text-4xl font-bold text-white flex-1 transition-all">
              GROW
            </h3>
            <p className="text-xs sm:text-sm text-[#B0B7C3] max-w-sm sm:text-right">
              Deepen your faith through practical biblical teaching, discipleship, and study guides.
            </p>
          </div>

          <div className="experience-item" data-reveal="exp">
            <span className="font-display text-xs text-[#FF6B2C] tracking-widest min-w-[2.5rem]">04</span>
            <h3 className="exp-title font-display text-2xl sm:text-4xl font-bold text-white flex-1 transition-all">
              SERVE
            </h3>
            <p className="text-xs sm:text-sm text-[#B0B7C3] max-w-sm sm:text-right">
              Use your unique gifts to make an eternal difference in our church and local community.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          EVENTS (What's Happening)
         ============================================================ */}
      <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <PencilHeading text="WHAT'S HAPPENING" dataPencil="events" maxWidth="720px" />
            <p className="text-[11px] font-display tracking-[0.2em] uppercase text-[#B0B7C3] flex items-center gap-3 mt-2">
              <span className="w-8 h-px bg-[#FF6B2C]" />
              Get involved
            </p>
          </div>

          <button
            onClick={() => onNavigate('events')}
            className="text-xs font-semibold text-[#FF6B2C] hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View All Church Events</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-0">
          {/* Event 1 */}
          <div 
            onClick={() => onNavigate('events')}
            className="event-item group" 
            data-reveal="event"
          >
            <div className="flex flex-col items-center min-w-[55px]">
              <span className="font-display font-black text-3xl text-[#FF6B2C] leading-none">24</span>
              <span className="font-display text-[10px] font-bold tracking-widest uppercase text-[#B0B7C3]">OCT</span>
            </div>
            {/* Event 1: Night of Worship & Prayer */}
            <EventImageWithFallback 
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80" 
              alt="Night of Worship & Prayer" 
              thumbnailClassName="w-24 h-16 object-cover rounded-sm hidden sm:block filter brightness-95 group-hover:brightness-105 transition-all shrink-0"
              isWorshipEvent={true}
            />
            <div>
              <h3 className="font-display font-semibold text-base sm:text-xl text-white group-hover:text-[#FF6B2C] transition-colors">Night of Worship & Prayer</h3>
              <p className="text-xs text-[#B0B7C3] mt-0.5">7:00 PM · Main Sanctuary · Free entry · All welcome</p>
            </div>
            <span className="event-arrow text-xl text-[#B0B7C3] transition-all">→</span>
          </div>

          {/* Event 2 */}
          <div 
            onClick={() => onNavigate('events')}
            className="event-item group cursor-pointer" 
            data-reveal="event"
          >
            <div className="flex flex-col items-center min-w-[55px]">
              <span className="font-display font-black text-3xl text-[#FF6B2C] leading-none">02</span>
              <span className="font-display text-[10px] font-bold tracking-widest uppercase text-[#B0B7C3]">NOV</span>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=400&q=80" 
              alt="Community Outreach" 
              className="w-24 h-16 object-cover rounded-sm hidden sm:block filter brightness-95 group-hover:brightness-105 transition-all shrink-0"
              loading="lazy"
            />
            <div>
              <h3 className="font-display font-semibold text-base sm:text-xl text-white group-hover:text-[#FF6B2C] transition-colors">Centurion Community Outreach</h3>
              <p className="text-xs text-[#B0B7C3] mt-0.5">9:00 AM · Centurion Central Park · Family friendly · Volunteer teams</p>
            </div>
            <span className="event-arrow text-xl text-[#B0B7C3] transition-all">→</span>
          </div>

          {/* Event 3 */}
          <div 
            onClick={() => onNavigate('events')}
            className="event-item group cursor-pointer" 
            data-reveal="event"
          >
            <div className="flex flex-col items-center min-w-[55px]">
              <span className="font-display font-black text-3xl text-[#FF6B2C] leading-none">15</span>
              <span className="font-display text-[10px] font-bold tracking-widest uppercase text-[#B0B7C3]">NOV</span>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=400&q=80" 
              alt="Youth Campfire" 
              className="w-24 h-16 object-cover rounded-sm hidden sm:block filter brightness-95 group-hover:brightness-105 transition-all shrink-0"
              loading="lazy"
            />
            <div>
              <h3 className="font-display font-semibold text-base sm:text-xl text-white group-hover:text-[#FF6B2C] transition-colors">Youth Campfire & Acoustic Praise</h3>
              <p className="text-xs text-[#B0B7C3] mt-0.5">6:30 PM · Church Grounds · High Schoolers (Grades 8–12)</p>
            </div>
            <span className="event-arrow text-xl text-[#B0B7C3] transition-all">→</span>
          </div>

          {/* Event 4 */}
          <div 
            onClick={() => onNavigate('events')}
            className="event-item group cursor-pointer" 
            data-reveal="event"
          >
            <div className="flex flex-col items-center min-w-[55px]">
              <span className="font-display font-black text-3xl text-[#FF6B2C] leading-none">30</span>
              <span className="font-display text-[10px] font-bold tracking-widest uppercase text-[#B0B7C3]">NOV</span>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80" 
              alt="Baptism Celebration" 
              className="w-24 h-16 object-cover rounded-sm hidden sm:block filter brightness-95 group-hover:brightness-105 transition-all shrink-0"
              loading="lazy"
            />
            <div>
              <h3 className="font-display font-semibold text-base sm:text-xl text-white group-hover:text-[#FF6B2C] transition-colors">Celebration Baptism Sunday</h3>
              <p className="text-xs text-[#B0B7C3] mt-0.5">10:00 AM · Main Sanctuary · Open registrations for all believers</p>
            </div>
            <span className="event-arrow text-xl text-[#B0B7C3] transition-all">→</span>
          </div>
        </div>
      </section>

      {/* ============================================================
          OUR IMPACT (Atmospheric Parallax + Animated Counters)
         ============================================================ */}
      <section id="impact" className="relative py-24 sm:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed filter brightness-[0.45] saturate-[0.9]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1920&q=85')"
          }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#080B12] via-[#080B12]/60 to-[#080B12]" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <PencilHeading text="OUR IMPACT" dataPencil="impact" maxWidth="480px" />
            <p className="text-[11px] font-display tracking-[0.2em] uppercase text-[#B0B7C3] flex items-center gap-3 mt-2">
              <span className="w-8 h-px bg-[#FF6B2C]" />
              See what God is doing
            </p>
          </div>

          <p className="max-w-xl text-sm sm:text-base text-[#B0B7C3] leading-relaxed mb-10" data-reveal="text">
            Beyond our Sunday gatherings, we serve our community through outreach, missions, discipleship, and initiatives that bring real hope.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="stat-item" data-reveal="stat">
              <span className="stat-number" data-target="1200">0</span>
              <span className="stat-label block text-xs tracking-wider uppercase text-[#B0B7C3] mt-2">People Connected</span>
            </div>

            <div className="stat-item" data-reveal="stat">
              <span className="stat-number" data-target="25">0</span>
              <span className="stat-label block text-xs tracking-wider uppercase text-[#B0B7C3] mt-2">Ministry Initiatives</span>
            </div>

            <div className="stat-item" data-reveal="stat">
              <span className="stat-number" data-target="100">0</span>
              <span className="stat-label block text-xs tracking-wider uppercase text-[#B0B7C3] mt-2">Community Projects</span>
            </div>

            <div className="stat-item" data-reveal="stat">
              <span className="stat-number" data-target="10">0</span>
              <span className="stat-label block text-xs tracking-wider uppercase text-[#B0B7C3] mt-2">Years of Impact</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          TESTIMONIES (Lives Changed)
         ============================================================ */}
      <TestimoniesSection onNavigate={onNavigate} />

      {/* ============================================================
          MAKE A DIFFERENCE (GIVE)
         ============================================================ */}
      <section id="give" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <PencilHeading text="MAKE A DIFFERENCE" dataPencil="give" maxWidth="780px" />
          <p className="text-[11px] font-display tracking-[0.2em] uppercase text-[#B0B7C3] flex items-center gap-3 mt-2">
            <span className="w-8 h-px bg-[#FF6B2C]" />
            Give with purpose
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="give-image" data-reveal="clip">
            <img 
              src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1200" 
              alt="Church volunteers serving" 
              className="w-full h-80 sm:h-96 object-cover rounded-sm shadow-xl filter brightness-[0.92]"
              loading="lazy"
            />
          </div>

          <div className="space-y-6" data-reveal="text">
            <p className="text-base sm:text-lg text-[#F5F2EE] leading-relaxed">
              Your generosity helps us reach further — supporting ministry, missions, local outreach, discipleship, and community care initiatives that change lives.
            </p>

            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-widest text-[#B0B7C3]">
              <span className="px-3 py-1.5 rounded-sm border border-white/10 bg-white/5">Ministry</span>
              <span className="px-3 py-1.5 rounded-sm border border-white/10 bg-white/5">Missions</span>
              <span className="px-3 py-1.5 rounded-sm border border-white/10 bg-white/5">Outreach</span>
              <span className="px-3 py-1.5 rounded-sm border border-white/10 bg-white/5">Discipleship</span>
              <span className="px-3 py-1.5 rounded-sm border border-white/10 bg-white/5">Community</span>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => onNavigate('contact')}
                className="btn btn-primary cursor-pointer"
              >
                <span>Give Securely Online</span>
                <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          COMMUNITY COLLAGE (Join the Family)
         ============================================================ */}
      <section id="community" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <PencilHeading text="JOIN THE FAMILY" dataPencil="community" maxWidth="680px" className="mx-auto" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 h-72 sm:h-96">
          <div className="relative rounded-sm overflow-hidden group cursor-pointer" data-reveal="clip">
            <img 
              src="https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=800&q=80" 
              alt="Worship Gathering" 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 filter brightness-90 group-hover:brightness-100"
              loading="lazy"
            />
          </div>
          <div className="relative rounded-sm overflow-hidden group cursor-pointer" data-reveal="clip">
            <img 
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80" 
              alt="People Connecting in Fellowship" 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 filter brightness-90 group-hover:brightness-100"
              loading="lazy"
            />
          </div>
          <div className="relative rounded-sm overflow-hidden group cursor-pointer" data-reveal="clip">
            <img 
              src="https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Youth Camp" 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 filter brightness-90 group-hover:brightness-100"
              loading="lazy"
            />
          </div>
          <div className="relative rounded-sm overflow-hidden group cursor-pointer" data-reveal="clip">
            <img 
              src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Hands Outreach" 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 filter brightness-90 group-hover:brightness-100"
              loading="lazy"
            />
          </div>
        </div>

        {/* Social Media Connect Strip */}
        <div className="mt-8 p-6 bg-[#0A0F1F] border border-white/10 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-display font-bold text-sm sm:text-base text-white">
              Stay Connected All Week Long
            </h4>
            <p className="text-xs text-[#B0B7C3] mt-0.5">
              Watch Sunday live streams, devotionals, youth clips, and community stories.
            </p>
          </div>
          <SocialMediaRow variant="badges" showLabels={true} iconClassName="w-3.5 h-3.5" />
        </div>
      </section>

      {/* ============================================================
          FREQUENTLY ASKED QUESTIONS (Accordion Component)
         ============================================================ */}
      <FaqSection 
        onNavigate={onNavigate}
        onPlanVisit={onPlanVisit}
        className="pt-6 pb-12"
      />

      {/* ============================================================
          FINAL CTA & CONTACT / PRAYER FORM
         ============================================================ */}
      <section id="contact" className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <PencilHeading text="YOUR NEXT CHAPTER" dataPencil="cta" maxWidth="760px" className="mx-auto" />
          <p className="text-sm sm:text-base text-[#B0B7C3] mt-3">
            Wherever you are in your journey, there is a place for you here.
          </p>
        </div>

        <ContactSection
          initialInquiryType="visit"
          initialService="09:00 AM"
        />
      </section>

    </div>
  );
};
