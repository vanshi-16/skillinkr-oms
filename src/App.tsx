import React, { useState, useEffect } from 'react';
import { Nav } from './components/layout/Nav';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { MarqueeColleges } from './components/sections/MarqueeColleges';
import { Problem } from './components/sections/Problem';
import { Roles } from './components/sections/Roles';
import { Flow } from './components/sections/Flow';
import { Governance } from './components/sections/Governance';
import { Portals } from './components/sections/Portals';
import { Capabilities } from './components/sections/Capabilities';
import { Impact } from './components/sections/Impact';
import { CTA } from './components/sections/CTA';
import { ArrowLeft } from 'lucide-react';

export const App: React.FC = () => {
  const [stubView, setStubView] = useState<string | null>(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (
        hash === '#apply-stub' ||
        hash === '#privacy-stub' ||
        hash === '#terms-stub' ||
        hash === '#policy-stub'
      ) {
        setStubView(hash.replace('#', ''));
      } else {
        setStubView(null);
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const closeStub = () => {
    window.location.hash = '';
    setStubView(null);
  };

  if (stubView) {
    const titles: Record<string, string> = {
      'apply-stub': 'Campus Ambassador Application',
      'privacy-stub': 'Institutional Privacy Policy',
      'terms-stub': 'Terms of Service',
      'policy-stub': 'College Governance Policy',
    };

    return (
      <main className="min-h-screen bg-canvas text-ink flex flex-col justify-between p-6 sm:p-12 font-sans">
        <div className="max-w-[720px] mx-auto w-full pt-12">
          <button
            type="button"
            onClick={closeStub}
            className="inline-flex items-center text-[14px] font-mono text-brand-600 hover:text-brand-700 mb-8 focus-visible:outline-2 focus-visible:outline-brand-600"
          >
            <ArrowLeft size={16} className="mr-2" />
            ← Back to OMS
          </button>

          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted block mb-3">
            SkillLinkr OMS Documentation Stub
          </span>
          <h1 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-ink mb-6">
            {titles[stubView] || 'Information Notice'}
          </h1>
          <p className="text-[17px] text-ink-2 leading-relaxed mb-6">
            This module connects directly to SkillLinkr OMS verified campus authentication and governance
            infrastructure. Institutional registration protocols and security claims are enforced at
            the row level.
          </p>
          <div className="bg-surface border border-line rounded-[10px] p-6 text-[14px] text-muted">
            Direct operational inquiries to{' '}
            <a
              href="mailto:oms@skilllinkr.com"
              className="text-brand-600 font-medium underline"
            >
              oms@skilllinkr.com
            </a>
            .
          </div>
        </div>
        <div className="max-w-[720px] mx-auto w-full text-[13px] text-muted border-t border-line pt-6">
          © &#123;&#123;YEAR&#125;&#125; SkillLinkr OMS.
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen text-ink flex flex-col font-sans selection:bg-brand-100 selection:text-brand-900 relative">
      {/* Global Background Image (Made highly visible) */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
        <img
          src="/images/hero-campus.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{
            opacity: 0.15, // Simple uniform opacity so it acts as a wallpaper across the whole site
            filter: 'brightness(0.9) contrast(1.1) sepia(0.3)', // Warm campus tone
          }}
          loading="eager"
        />
      </div>

      {/* Skip to Main Content Link for Screen Readers & Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-600 focus:text-white focus:rounded-[8px] focus:font-medium focus:text-[14px]"
      >
        Skip to main content
      </a>

      {/* Screen Reader Polite Live Region for dynamic status announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true" id="live-region" />

      {/* 0. NAV (sticky, 64px) */}
      <Nav />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 w-full relative z-10">
        {/* 1. HERO */}
        <Hero />

        {/* 2. COLLEGE MARQUEE */}
        <MarqueeColleges />

        {/* 3. THE PROBLEM */}
        <Problem />

        {/* 4. THE THREE CORE ROLES */}
        <Roles />

        {/* 5. HOW THE OMS WORKS */}
        <Flow />

        {/* 6. COLLEGE-SPECIFIC GOVERNANCE */}
        <Governance />

        {/* 7. THE THREE PORTALS */}
        <Portals />

        {/* 8. KEY CAPABILITIES */}
        <Capabilities />

        {/* 9. STUDENT IMPACT */}
        <Impact />

        {/* 10. FINAL CTA */}
        <CTA />
      </main>

      {/* 11. FOOTER */}
      <Footer />
    </div>
  );
};

export default App;
