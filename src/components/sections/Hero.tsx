import React, { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { content } from '../../data/content';
import { Container } from '../layout/Container';
import { Eyebrow } from '../primitives/Eyebrow';
import { Button } from '../primitives/Button';
import { Reveal } from '../primitives/Reveal';
import { ConsoleMock } from '../mockups/ConsoleMock';
import { SPRING_SMOOTH } from '../../lib/motion';

export const Hero: React.FC = () => {
  const { eyebrow, title, sub, ctaPrimary, ctaSecondary, microTrust, ribbonStrip } =
    content.hero;

  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Hero scroll drift — mock drifts up 8px, scales 1→1.015
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const rawRowY = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const rawCardScale = useTransform(scrollYProgress, [0, 1], [1, 1.015]);
  const rowY = useSpring(rawRowY, SPRING_SMOOTH);
  const cardScale = useSpring(rawCardScale, SPRING_SMOOTH);

  // Mouse parallax (P2) — fine pointer only
  const canHover =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const mxRaw = useSpring(0, { stiffness: 120, damping: 20 });
  const myRaw = useSpring(0, { stiffness: 120, damping: 20 });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!canHover || shouldReduceMotion) return;
    mxRaw.set((e.clientX / window.innerWidth - 0.5) * 8);
    myRaw.set((e.clientY / window.innerHeight - 0.5) * 6);
  };

  const renderTitle = () => {
    const parts = title.split('*');
    if (parts.length === 3) {
      return (
        <h1 className="type-h1 text-ink mb-6 tracking-tight">
          {parts[0]}<span className="italic font-normal">{parts[1]}</span>{parts[2]}
        </h1>
      );
    }
    return <h1 className="type-h1 text-ink mb-6 tracking-tight">{title}</h1>;
  };

  const ribbonItems = ribbonStrip.split('→').map((s) => s.trim());

  return (
    <section
      ref={heroRef}
      className="relative pt-20 lg:pt-24 pb-0 overflow-hidden"
      onPointerMove={handlePointerMove}
    >
      {/* Subtle 3% opacity vertical wash */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-brand-600/[0.03] to-transparent pointer-events-none"
        aria-hidden="true"
      />





      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column (cols 1–7) */}
          <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-4">
            <Reveal variant="fade">
              <Eyebrow variant="brand" className="mb-4">
                {eyebrow}
              </Eyebrow>
            </Reveal>

            <Reveal variant="fadeUp" delay={0.05}>
              {renderTitle()}
            </Reveal>

            <Reveal variant="fadeUp" delay={0.1}>
              <p className="text-[18px] text-ink-2 leading-relaxed max-w-[60ch] mb-8 font-normal">
                {sub}
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal variant="fadeUp" delay={0.15}>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Button variant="primary" size="lg" href={ctaPrimary.href} trailingArrow>
                  {ctaPrimary.label}
                </Button>
                <a
                  href={ctaSecondary.href}
                  className="h-12 px-6 rounded-[10px] border border-line-strong text-ink hover:bg-surface hover:-translate-y-[1px] hover:shadow-[0_2px_8px_rgba(11,18,32,0.06)] active:translate-y-0 inline-flex items-center justify-center font-medium font-sans text-[15px] transition-all duration-160 group focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-3"
                >
                  <span>{ctaSecondary.label}</span>
                  <ArrowDown
                    size={16}
                    strokeWidth={1.5}
                    className="ml-2 transition-transform duration-160 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </Reveal>

            {/* Micro-trust line */}
            <Reveal variant="fade" delay={0.2}>
              <div className="flex flex-wrap items-center gap-y-2 text-[13px] text-muted">
                {microTrust.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <span>{item}</span>
                    {idx < microTrust.length - 1 && (
                      <span className="mx-2.5 text-line-strong" aria-hidden="true">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </Reveal>

            {/* Opportunity listing previews — 3 real-looking cards floating below the CTAs */}
            <Reveal variant="fadeUp" delay={0.3} className="w-full mt-10 hidden sm:block">
              <div className="flex gap-3">
                {[
                  { tag: 'HACKATHON', title: 'Open Source Weekend', org: 'Coding Club · KIIT', time: '2h ago', color: 'var(--brand-600)' },
                  { tag: 'WORKSHOP', title: 'Robotics Bootcamp', org: 'Robotics Society · KIIT', time: '5h ago', color: 'var(--warn)' },
                  { tag: 'INTERNSHIP', title: 'Summer Research Drive', org: 'Dept. of CS · KIIT', time: '1d ago', color: 'var(--ok)' },
                ].map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                    className="flex-1 min-w-0 bg-surface border border-line rounded-[10px] p-3.5 transition-all duration-180 hover:border-line-strong hover:-translate-y-[2px] hover:shadow-[0_1px_2px_rgba(11,18,32,0.04),0_8px_24px_-12px_rgba(11,18,32,0.10)] cursor-default"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: card.color }}
                        aria-hidden="true"
                      />
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                        {card.tag}
                      </span>
                    </div>
                    <p className="font-sans font-medium text-[13px] text-ink leading-snug truncate">
                      {card.title}
                    </p>
                    <p className="font-mono text-[11px] text-muted mt-1 truncate">
                      {card.org}
                    </p>
                    <div className="mt-2 pt-2 border-t border-line flex items-center justify-between">
                      <span className="font-mono text-[10px] text-muted">{card.time}</span>
                      <span className="font-mono text-[10px] text-brand-600">Pending review</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column Visual (cols 8–12) with poster collage + ConsoleMock */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 w-full">
            <Reveal variant="fadeUp" delay={0.15}>
              {/* Scroll drift wrapper */}
              <motion.div style={shouldReduceMotion ? undefined : { y: rowY }}>
                {/* Mouse parallax wrapper */}
                <motion.div
                  style={canHover && !shouldReduceMotion ? { x: mxRaw, y: myRaw } : undefined}
                >
                  {/* Scale wrapper */}
                  <motion.div style={shouldReduceMotion ? undefined : { scale: cardScale }}>
                      <ConsoleMock mode="hero" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Ribbon strip */}
      <div className="w-full mt-12 relative z-10">
        <div className="w-full border-t border-line" aria-hidden="true" />
        <div className="py-4 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted flex items-center justify-center gap-2">
            {ribbonItems.map((item, idx) => (
              <React.Fragment key={item}>
                <span>{item}</span>
                {idx < ribbonItems.length - 1 && (
                  <span className="text-line-strong" style={{ color: 'var(--line-strong)' }}>→</span>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};
