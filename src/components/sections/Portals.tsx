import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X } from 'lucide-react';
import { content, PortalTab } from '../../data/content';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Eyebrow } from '../primitives/Eyebrow';
import { Reveal } from '../primitives/Reveal';
import { SocietyMock } from '../mockups/SocietyMock';
import { AmbassadorMock } from '../mockups/AmbassadorMock';
import { AdminMock } from '../mockups/AdminMock';

export const Portals: React.FC = () => {
  const { eyebrow, title, tabs } = content.portals;
  const [activeTabId, setActiveTabId] = useState<PortalTab['id']>('society');
  const [previewSheetOpen, setPreviewSheetOpen] = useState(false);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      const nextIndex = (index + 1) % tabs.length;
      setActiveTabId(tabs[nextIndex].id);
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      setActiveTabId(tabs[prevIndex].id);
    }
  };

  return (
    <Section id="portals" ariaLabelledBy="portals-title">
      <Container>
        {/* Section Header */}
        <div className="max-w-[760px] mb-6">
          <Reveal variant="fade">
            <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.05}>
            <h2 id="portals-title" className="type-h2 text-ink">
              {title}
            </h2>
          </Reveal>
        </div>

        {/* Tab Navigation with ARIA Tabs Pattern & Sliding Underline Indicator */}
        <div
          role="tablist"
          aria-label="Portal Selection"
          className="flex items-center gap-8 border-b border-line mb-6 overflow-x-auto pb-0"
        >
          {tabs.map((tab, idx) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-controls={`panel-${tab.id}`}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTabId(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`relative pb-3 font-mono text-[13px] uppercase tracking-[0.1em] font-medium transition-colors cursor-pointer select-none whitespace-nowrap focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-4 ${
                  isActive ? 'text-brand-600 font-semibold' : 'text-muted hover:text-ink'
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="portal-tab-indicator"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 32,
                    }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-600"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Panel Crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            id={`panel-${activeTab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header Line */}
            <p className="text-[15px] text-ink font-medium mb-6 max-w-[72ch] leading-relaxed">
              {activeTab.headerLine}
            </p>

            {/* 2-Column: Checklist on left, Mock on right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Clean checklist */}
              <div className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                  {activeTab.checklist.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: idx * 0.04 }}
                      className="flex items-start gap-3 py-3.5 border-b border-line"
                    >
                      <Check
                        size={13}
                        strokeWidth={2.5}
                        className="text-brand-600 mt-[3px] flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-[14px] text-ink font-semibold leading-snug">
                        {item}
                      </span>
                      {activeTab.id === 'society' && idx === 3 && (
                        <button
                          type="button"
                          onClick={() => setPreviewSheetOpen(true)}
                          className="block mt-1 font-mono text-[11px] text-brand-600 hover:underline uppercase tracking-wider"
                        >
                          Preview →
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>

                {activeTab.note && (
                  <p className="text-[13px] text-ink mt-4 italic leading-relaxed">
                    {activeTab.note}
                  </p>
                )}
              </div>

              {/* Right Column: Code-built UI Mockup */}
              <div className="lg:col-span-6 w-full">
                {activeTab.id === 'society' && <SocietyMock />}
                {activeTab.id === 'ambassador' && <AmbassadorMock />}
                {activeTab.id === 'admin' && <AdminMock />}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Code-built listing-preview sheet (drag-to-dismiss or close button) */}
        <AnimatePresence>
          {previewSheetOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-xs flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-label="Listing Preview Modal"
            >
              <motion.div
                initial={{ scale: 0.95, y: 16 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 16 }}
                className="bg-surface border border-line-strong rounded-[12px] p-6 max-w-lg w-full shadow-lg"
              >
                <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand-600 font-semibold">
                    Listing Preview · Student Experience
                  </span>
                  <button
                    type="button"
                    onClick={() => setPreviewSheetOpen(false)}
                    className="p-1 rounded text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-brand-600"
                    aria-label="Close preview"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="w-full h-36 bg-surface-sunk rounded-[8px] flex items-center justify-center border border-line">
                    <span className="font-mono text-[11px] text-muted">
                      Uploaded Poster Preview (1200×630)
                    </span>
                  </div>
                  <h4 className="font-sans font-semibold text-[17px] text-ink">
                    National Level Hackathon 2026
                  </h4>
                  <div className="flex items-center gap-2 text-[12px] text-muted">
                    <span>KIIT Computer Science Society</span>
                    <span>·</span>
                    <span>Verified Listing</span>
                  </div>
                  <p className="text-[13px] text-ink-2 leading-relaxed">
                    Students will discover this opportunity once verified and approved by the
                    assigned same-college Campus Ambassador.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-line flex justify-end">
                  <button
                    type="button"
                    onClick={() => setPreviewSheetOpen(false)}
                    className="px-4 py-2 bg-brand-600 text-white font-medium text-[13px] rounded-[8px] hover:bg-brand-700"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
};
