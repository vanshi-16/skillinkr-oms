import React, { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { content } from '../../data/content';
import { Button } from '../primitives/Button';
import { useScrolledPast } from '../../lib/motion';
import { ContactModal } from './ContactModal';
import { RegisterModal } from './RegisterModal';

export const Nav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const scrolled = useScrolledPast(24);

  // Handle Escape key to close mobile menu
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const { brand, badge, links, ctaSecondary, ctaPrimary } = content.nav;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'h-14 bg-[#F7F5F1]/85 backdrop-blur-md border-b border-line shadow-[0_1px_2px_rgba(11,18,32,0.03)]'
            : 'h-16 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto w-full max-w-[1280px] h-full px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Left: Brand wordmark & OMS badge */}
          <a
            href="#"
            className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-3 rounded"
            aria-label="SkillLinkr OMS Home"
          >
            <img
              src="/logo.png"
              alt="SkillLinkr Logo"
              className="w-7 h-7 rounded-[6px] object-cover flex-shrink-0 shadow-xs"
            />
            <span className="font-sans font-semibold text-[17px] text-ink tracking-tight">
              {brand}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted border border-line rounded-full px-1.5 py-0.5 leading-none bg-surface/50">
              {badge}
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-5 xl:gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-2 hover:text-brand-600 transition-colors duration-160 focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-3 rounded"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="hidden sm:flex items-center gap-3 md:gap-4">
            <button
              onClick={() => setIsContactOpen(true)}
              className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-2 hover:text-brand-600 transition-colors duration-160 focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-3 rounded px-1 py-1"
            >
              Contact
            </button>
            <div className="h-4 w-[1px] bg-line hidden md:block" />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsRegisterOpen(true)}
            >
              Register
            </Button>
            <Button
              variant="secondary"
              size="sm"
              href={ctaSecondary.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ctaSecondary.label}
            </Button>
            <Button
              variant="primary"
              size="sm"
              href={ctaPrimary.href}
              trailingArrow
            >
              {ctaPrimary.label}
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            ref={menuBtnRef}
            type="button"
            className="sm:hidden p-2 text-ink hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-3 rounded"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open main navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-canvas/98 backdrop-blur-lg flex flex-col p-6 sm:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div className="flex items-center justify-between pb-6 border-b border-line flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <img
                  src="/logo.png"
                  alt="SkillLinkr Logo"
                  className="w-7 h-7 rounded-[6px] object-cover flex-shrink-0 shadow-xs"
                />
                <span className="font-sans font-semibold text-[17px] text-ink">
                  {brand}
                </span>
                <span className="font-mono text-[10px] uppercase text-muted border border-line rounded-full px-1.5 py-0.5">
                  {badge}
                </span>
              </div>
              <button
                type="button"
                className="p-2 text-ink hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-3 rounded"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-col gap-5 py-8 flex-1 justify-center">
              {links.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.25 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-[26px] text-ink hover:text-brand-600 transition-colors focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-3"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col gap-2.5 pt-4 border-t border-line flex-shrink-0">
              <div className="grid grid-cols-2 gap-2.5">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsContactOpen(true);
                  }}
                  className="w-full text-center"
                >
                  Contact
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsRegisterOpen(true);
                  }}
                  className="w-full text-center"
                >
                  Register
                </Button>
              </div>
              <Button
                variant="secondary"
                size="lg"
                href={ctaSecondary.href}
                className="w-full text-center"
              >
                {ctaSecondary.label}
              </Button>
              <Button
                variant="primary"
                size="lg"
                href={ctaPrimary.href}
                trailingArrow
                className="w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {ctaPrimary.label}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </>
  );
};
