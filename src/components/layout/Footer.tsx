import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { content } from '../../data/content';
import { Container } from './Container';

export const Footer: React.FC = () => {
  const { brand, badge, positioning, columns, copyright, tagline } = content.footer;
  const [openAccordions, setOpenAccordions] = useState<Record<number, boolean>>({});

  const toggleAccordion = (index: number) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <footer className="w-full border-t border-line pt-8 pb-8">
      <Container>
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-8">
          {/* Column 1: Brand & Positioning Statement (lg: 5-col) */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8">
            <a
              href="#"
              className="flex items-center gap-2.5 mb-4 focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-3 rounded"
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
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink font-medium border border-line rounded-full px-1.5 py-0.5 leading-none bg-surface/50">
                {badge}
              </span>
            </a>
            <p className="text-[15px] text-ink font-medium leading-relaxed max-w-[40ch]">
              {positioning}
            </p>
          </div>

          {/* Columns 2, 3, 4: Links (Desktop & Tablet: columns, Mobile: accordion) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {columns.map((col, idx) => (
              <div key={col.title} className="border-b sm:border-b-0 border-line pb-4 sm:pb-0">
                {/* Mobile Accordion Toggle */}
                <button
                  type="button"
                  className="sm:hidden w-full flex items-center justify-between py-2 text-left font-mono text-[11px] uppercase tracking-[0.12em] text-ink font-semibold"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={!!openAccordions[idx]}
                >
                  <span>{col.title}</span>
                  <ChevronDown
                    size={16}
                    strokeWidth={1.5}
                    className={`transition-transform duration-200 text-ink ${
                      openAccordions[idx] ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Desktop header */}
                <h4 className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.12em] text-ink font-semibold mb-4">
                  {col.title}
                </h4>

                {/* Link list */}
                <ul
                  className={`flex flex-col gap-2.5 pt-2 sm:pt-0 ${
                    openAccordions[idx] ? 'block' : 'hidden sm:flex'
                  }`}
                >
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[14px] text-ink font-medium hover:text-brand-600 transition-colors duration-160 focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-3 rounded"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-line pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[14px] text-ink font-medium font-sans">
          <div>{copyright}</div>
          <div>{tagline}</div>
        </div>
      </Container>
    </footer>
  );
};
