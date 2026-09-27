import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PlanVisitPage } from './pages/PlanVisitPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { MinistriesPage } from './pages/MinistriesPage';
import { SermonsPage } from './pages/SermonsPage';
import { EventsPage } from './pages/EventsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { PageId, InquiryType } from './types';

export default function App() {
  // Read initial page from URL hash if available
  const getPageFromHash = (): PageId => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    const validPages: PageId[] = ['home', 'visit', 'story', 'ministries', 'sermons', 'events', 'contact', 'admin'];
    return validPages.includes(hash as PageId) ? (hash as PageId) : 'home';
  };

  const [activePage, setActivePage] = useState<PageId>(getPageFromHash);
  const [contactInitialType, setContactInitialType] = useState<InquiryType>('visit');
  const [contactInitialMessage, setContactInitialMessage] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Slow page appearance state (triggered when item selected from hamburger menu)
  const [isSlowAppearing, setIsSlowAppearing] = useState(false);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Cleanup transition timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  // Synchronize with URL hash changes (browser back/forward button support)
  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      setIsSlowAppearing(false);
      setActivePage(page);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  /**
   * Navigate to a page.
   * When fromMenu is true (selected from hamburger menu), the new page
   * slowly, smoothly, and gently appears into view without any zoom.
   */
  const navigateToPage = (
    page: PageId, 
    options?: { initialType?: InquiryType; initialMessage?: string },
    fromMenu: boolean = false
  ) => {
    if (options?.initialType) setContactInitialType(options.initialType);
    if (options?.initialMessage !== undefined) setContactInitialMessage(options.initialMessage);

    // If navigating to the already active page, simply scroll to top
    if (page === activePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);

    if (fromMenu) {
      // Trigger slow, elegant fade-in of the selected page
      setIsSlowAppearing(true);
      setActivePage(page);
      window.location.hash = `/${page}`;
      window.scrollTo({ top: 0, behavior: 'instant' });

      transitionTimerRef.current = setTimeout(() => {
        setIsSlowAppearing(false);
      }, 1250);
    } else {
      setIsSlowAppearing(false);
      setActivePage(page);
      window.location.hash = `/${page}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJoinMinistry = (ministryTitle: string) => {
    navigateToPage('contact', {
      initialType: 'ministry',
      initialMessage: `Hi! I would love to connect with and learn more about ${ministryTitle}. Please let me know how I can get involved.`
    });
  };

  const handleRSVPEvent = (eventTitle: string) => {
    navigateToPage('contact', {
      initialType: 'general',
      initialMessage: `Hi! I would like to RSVP / inquire about the upcoming event: "${eventTitle}".`
    });
  };

  // Helper to render page content cleanly for both main view and transition portal
  const renderPageContent = (page: PageId) => {
    switch (page) {
      case 'home':
        return (
          <HomePage 
            onNavigate={(p, coords) => navigateToPage(p, undefined, coords)}
            onPlanVisit={() => navigateToPage('visit')}
          />
        );
      case 'visit':
        return (
          <PlanVisitPage 
            onNavigate={(p, coords) => navigateToPage(p, undefined, coords)}
          />
        );
      case 'story':
        return (
          <OurStoryPage 
            onNavigate={(p, coords) => navigateToPage(p, undefined, coords)}
            onPlanVisit={() => navigateToPage('visit')}
          />
        );
      case 'ministries':
        return (
          <MinistriesPage 
            onNavigate={(p, coords) => navigateToPage(p, undefined, coords)}
            onJoinMinistry={handleJoinMinistry}
          />
        );
      case 'sermons':
        return (
          <SermonsPage 
            onNavigate={(p, coords) => navigateToPage(p, undefined, coords)}
          />
        );
      case 'events':
        return (
          <EventsPage 
            onNavigate={(p, coords) => navigateToPage(p, undefined, coords)}
            onRSVP={handleRSVPEvent}
          />
        );
      case 'contact':
        return (
          <ContactPage 
            onNavigate={(p, coords) => navigateToPage(p, undefined, coords)}
            initialType={contactInitialType}
            initialMessage={contactInitialMessage}
          />
        );
      case 'admin':
        return (
          <AdminPage 
            onNavigate={(p) => navigateToPage(p)}
          />
        );
      default:
        return (
          <HomePage 
            onNavigate={(p, coords) => navigateToPage(p, undefined, coords)}
            onPlanVisit={() => navigateToPage('visit')}
          />
        );
    }
  };

  const isReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F5F2EE] font-sans antialiased selection:bg-[#FF6B2C] selection:text-[#080B12] relative overflow-x-hidden flex flex-col justify-between">
      {/* Scroll Progress Indicator */}
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      {/* Background ambient lighting */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] bg-[#FF6B2C]/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[800px] h-[800px] bg-blue-950/15 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Header Navigation with Fullscreen Hamburger & Active Page Links */}
      <Navigation 
        activePage={activePage}
        onNavigate={(page, fromMenu) => navigateToPage(page, undefined, fromMenu)}
        onOpenPlanVisit={() => navigateToPage('visit', undefined, true)} 
        isTransitioning={isSlowAppearing}
      />

      {/* Main Routed Page Content */}
      <main 
        key={activePage}
        className={`flex-1 ${isSlowAppearing ? 'page-slow-appear' : ''}`}
      >
        {renderPageContent(activePage)}
      </main>

      {/* Footer with Page Links & Service Times */}
      <Footer 
        onNavigate={(page) => navigateToPage(page)}
        onPlanVisit={() => navigateToPage('visit')} 
      />
    </div>
  );
}
