import React from 'react';
import { content } from '../../data/content';
import { Container } from '../layout/Container';
import { Reveal } from '../primitives/Reveal';
import { Counter } from '../../lib/motion';

export const Impact: React.FC = () => {
  const { title, body, stats, quote } = content.impact;

  return (
    <section className="relative w-full bg-brand-900 text-[#F7F5F1] py-[clamp(80px,10vw,140px)] overflow-hidden">
      {/* 1px grid of rgba(247,245,241,.05) lines at 48px, masked with radial fade */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(247,245,241,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,245,241,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Header */}
        <div className="max-w-[760px] mb-8">
          <Reveal variant="fadeUp">
            <h2 className="font-serif text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.05] tracking-tight font-normal text-[#F7F5F1] mb-6">
              {title}
            </h2>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.1}>
            <p className="text-[17px] text-[#F7F5F1]/72 leading-relaxed max-w-[68ch]">
              {body}
            </p>
          </Reveal>
        </div>

        {/* 3 Animated Stat Slots — hairline-divided row */}
        {/* Count up on in-view via Counter from lib/motion.ts — Intl.NumberFormat en-IN */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[rgba(247,245,241,0.14)] border-t border-b border-[rgba(247,245,241,0.14)] py-8 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-start px-0 md:px-8 py-4 md:py-0 ${idx === 0 ? 'md:pl-0' : ''}`}
            >
              <div className="font-serif text-[3.5rem] leading-none text-[#F7F5F1] tabular-nums tracking-tight mb-2">
                {stat.isPlaceholderToken ? (
                  // Placeholder tokens stay as-is — do not animate, do not invent metrics
                  <span className="font-mono text-[2.25rem] text-[#F7F5F1]/90">
                    {stat.token}
                  </span>
                ) : (
                  // Only the non-placeholder stat (100%) uses Counter
                  <Counter
                    to={stat.targetNum}
                    suffix={stat.suffix}
                    className="font-serif text-[3.5rem] leading-none text-[#F7F5F1]"
                  />
                )}
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[rgba(247,245,241,0.6)] font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Closing Quote Line — Instrument Serif italic */}
        <Reveal variant="fadeUp" delay={0.15}>
          <p className="font-serif italic text-[clamp(1.75rem,3vw,2.5rem)] text-[#F7F5F1] leading-snug max-w-[60ch]">
            "{quote}"
          </p>
        </Reveal>
      </Container>
    </section>
  );
};
