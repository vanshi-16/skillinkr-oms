import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValueEvent,
  AnimatePresence,
} from 'motion/react';
import { ChevronDown, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { content } from '../../data/content';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Eyebrow } from '../primitives/Eyebrow';
import { Reveal } from '../primitives/Reveal';
import { TimelineMock } from '../mockups/TimelineMock';
import { EASE, SPRING_SMOOTH } from '../../lib/motion';

export const Flow: React.FC = () => {
  const { eyebrow, title, body, steps } = content.flow;
  const railRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [step4Open, setStep4Open] = useState(false);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 0.7', 'end 0.4'],
  });

  // Spring-smooth the connector line — this is what makes it not janky
  const lineScale = useSpring(scrollYProgress, SPRING_SMOOTH);
  const lineAlpha = useTransform(scrollYProgress, [0, 0.15, 0.9, 1], [0, 1, 1, 0.35]);

  // Derive active step index from the same motion value — always in sync with the line
  useMotionValueEvent(scrollYProgress, 'change', (v) =>
    setActive(Math.min(steps.length - 1, Math.floor(v * steps.length))),
  );

  const renderTitle = () => {
    const parts = title.split('*');
    if (parts.length === 3) {
      return (
        <h2 id="flow-title" className="type-h2 text-ink mb-4">
          {parts[0]}
          <span className="text-brand-600 bg-brand-100/60 px-3 py-1 -mx-1 rounded-xl italic inline-block transform -rotate-1 shadow-sm">
            {parts[1]}
          </span>
          {parts[2]}
        </h2>
      );
    }
    return (
      <h2 id="flow-title" className="type-h2 text-ink mb-4">
        {title}
      </h2>
    );
  };

  return (
    <Section id="flow" ariaLabelledBy="flow-title">
      <Container>
        {/* Section Header */}
        <div className="max-w-[760px] mb-8">
          <Reveal variant="fade">
            <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.05}>
            {renderTitle()}
          </Reveal>
          <Reveal variant="fadeUp" delay={0.1}>
            <p className="type-body text-[17px] text-ink-2 max-w-[68ch]">
              {body}
            </p>
          </Reveal>
        </div>

        {/* Animated Branching Flow Diagram */}
        <Reveal variant="fadeUp" delay={0.15}>
          <div className="mb-12 py-8 px-4 sm:px-8 bg-surface border border-line rounded-[16px] shadow-[0_4px_24px_rgba(11,18,32,0.04)] max-w-[680px] mx-auto overflow-hidden">
            <div className="relative w-full flex items-center justify-between min-h-[160px]">
              
              {/* Connector line behind */}
              <div className="absolute left-6 right-16 sm:right-20 top-1/2 -translate-y-1/2 h-0.5 bg-brand-600/20 z-0" />
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
                className="absolute left-6 right-16 sm:right-20 top-1/2 -translate-y-1/2 h-0.5 bg-brand-600 origin-left z-0"
              />

              {/* Node 1: Create */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, type: "spring" }}
                className="flex flex-col items-center gap-1.5 z-10 bg-surface px-1"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-100 border-2 border-brand-600 flex items-center justify-center shadow-md">
                  <span className="font-mono text-[12px] sm:text-[13px] text-brand-600 font-bold">1</span>
                </div>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wide text-ink font-semibold">Create</span>
              </motion.div>

              {/* Node 2 & 3: Review & Verify */}
              <div className="flex flex-col gap-6 sm:gap-8 z-10 my-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-[6px] bg-surface border border-line shadow-xs"
                >
                  <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-muted font-semibold">Review</span>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-[6px] bg-surface border border-line shadow-xs"
                >
                  <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-muted font-semibold">Verify</span>
                </motion.div>
              </div>

              {/* Node 4: OMS Hub */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="flex flex-col items-center z-10"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[10px] bg-brand-600 border border-brand-700 flex items-center justify-center shadow-lg shadow-brand-600/30">
                  <span className="font-mono text-[9px] sm:text-[10px] text-white font-bold uppercase tracking-widest">OMS</span>
                </div>
              </motion.div>

              {/* Node 5 & 6: Branching to Publish & Reject */}
              <div className="flex flex-col gap-5 sm:gap-6 z-10 relative">
                {/* SVG Branching Lines */}
                <svg className="absolute -left-8 sm:-left-12 top-1/2 -translate-y-1/2 w-8 sm:w-12 h-24 z-0 overflow-visible">
                  <motion.path 
                    d="M 0 48 Q 16 48 28 12 L 36 12" 
                    fill="transparent" 
                    strokeWidth="2" 
                    stroke="var(--color-ok)" 
                    strokeOpacity="0.8"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  />
                  <motion.path 
                    d="M 0 48 Q 16 48 28 84 L 36 84" 
                    fill="transparent" 
                    strokeWidth="2" 
                    stroke="var(--color-danger)" 
                    strokeOpacity="0.8"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  />
                </svg>

                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.0 }}
                  className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-ok/10 border border-ok/30 flex items-center justify-center"
                >
                  <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-ok font-bold">Publish</span>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.1 }}
                  className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-danger/10 border border-danger/30 flex items-center justify-center"
                >
                  <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-danger font-bold">Reject</span>
                </motion.div>
              </div>

            </div>
          </div>
        </Reveal>

        {/* Connector rail + Steps */}
        <div ref={railRef} className="relative mb-8">
          {/* Desktop horizontal connector track + animated brand line */}
          <div
            className="hidden lg:block absolute top-[7px] left-0 right-0 h-px bg-line z-0"
            aria-hidden="true"
          >
            <motion.div
              className="h-full w-full bg-brand-600 origin-left"
              style={
                shouldReduceMotion
                  ? { scaleX: 1 }
                  : { scaleX: lineScale, opacity: lineAlpha }
              }
            />
          </div>

          {/* Steps Grid */}
          <ol className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 z-10">
            {steps.map((step, i) => {
              const isExpandable = step.expandable;
              const isActive = i === active;
              const isPast = i < active;

              return (
                <li key={step.stepNumber} className="relative pt-9">
                  {/* Step marker circle — 15px, numbered, animated per spec */}
                  <motion.span
                    className="absolute left-0 top-0 grid h-[15px] w-[15px] place-items-center rounded-full border bg-canvas font-mono text-[9px] select-none"
                    animate={{
                      borderColor:
                        isPast || isActive
                          ? 'var(--brand-600)'
                          : 'var(--line-strong)',
                      color:
                        isPast || isActive
                          ? 'var(--brand-600)'
                          : 'var(--muted)',
                      scale: isActive && !shouldReduceMotion ? 1.08 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </motion.span>

                  {/* Step eyebrow label */}
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    {step.stepNumber}
                  </p>

                  {/* Step title + expand toggle */}
                  <div className="flex items-start justify-between mt-2 gap-1">
                    <h3 className="font-sans font-semibold text-[15px] text-ink leading-tight">
                      {step.name}
                    </h3>
                    {isExpandable && (
                      <button
                        type="button"
                        onClick={() => setStep4Open((o) => !o)}
                        className="text-muted hover:text-ink p-0.5 rounded focus-visible:outline-2 focus-visible:outline-brand-600 flex-shrink-0"
                        aria-label="Toggle review decision options"
                        aria-expanded={step4Open}
                      >
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-220 ${step4Open ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Step description */}
                  <p className="mt-2 text-[13px] text-ink-2 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Step 04 AnimatePresence micro-panel — height auto, the ONE legitimate height anim */}
                  {isExpandable && (
                    <AnimatePresence initial={false}>
                      {step4Open && (
                        <motion.div
                          key="panel-04"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: shouldReduceMotion ? 0.01 : 0.28, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 grid gap-2 sm:grid-cols-1">
                            {[
                              {
                                label: 'Approve',
                                icon: CheckCircle2,
                                color: 'var(--ok)',
                                bg: 'rgba(21,128,61,0.08)',
                                border: 'rgba(21,128,61,0.2)',
                              },
                              {
                                label: 'Reject with reason',
                                icon: XCircle,
                                color: 'var(--danger)',
                                bg: 'rgba(180,35,24,0.08)',
                                border: 'rgba(180,35,24,0.2)',
                              },
                              {
                                label: 'Request correction',
                                icon: AlertCircle,
                                color: 'var(--warn)',
                                bg: 'rgba(180,83,9,0.08)',
                                border: 'rgba(180,83,9,0.2)',
                              },
                            ].map((a) => (
                              <div
                                key={a.label}
                                className="rounded-[6px] p-2.5"
                                style={{
                                  background: a.bg,
                                  border: `1px solid ${a.border}`,
                                }}
                              >
                                <div
                                  className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold"
                                  style={{ color: a.color }}
                                >
                                  <a.icon size={11} aria-hidden="true" />
                                  <span>{a.label}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* TimelineMock Under Rail */}
        <Reveal variant="fadeUp" delay={0.15}>
          <TimelineMock />
        </Reveal>
      </Container>
    </Section>
  );
};
