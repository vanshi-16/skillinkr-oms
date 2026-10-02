import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { content } from '../../data/content';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Eyebrow } from '../primitives/Eyebrow';
import { Reveal } from '../primitives/Reveal';

interface ChipNode {
  name: string;
  x: number;
  y: number;
  chipW: number;
  chipH: number;
}

export const Problem: React.FC = () => {
  const { eyebrow, title, paragraphs, chips, centralNode, principles } = content.problem;
  const shouldReduceMotion = useReducedMotion();

  // Perfectly centered in the 460 x 280 SVG coordinate space
  const center = { x: 230, y: 140 };

  const chipNodes: ChipNode[] = [
    { name: chips[0] || 'WhatsApp', x: 40, y: 35, chipW: 88, chipH: 28 },
    { name: chips[1] || 'Instagram', x: 300, y: 25, chipW: 90, chipH: 28 },
    { name: chips[2] || 'Posters', x: 20, y: 135, chipW: 78, chipH: 28 },
    { name: chips[3] || 'Email chains', x: 330, y: 110, chipW: 100, chipH: 28 },
    { name: chips[4] || 'Forms', x: 50, y: 240, chipW: 70, chipH: 28 },
    { name: chips[5] || 'Society pages', x: 190, y: 250, chipW: 112, chipH: 28 },
    { name: chips[6] || 'DMs', x: 345, y: 230, chipW: 64, chipH: 28 },
  ];

  const renderTitle = () => {
    const parts = title.split('*');
    if (parts.length === 3) {
      return (
        <h2 id="problem-title" className="type-h2 text-ink">
          {parts[0]}<span className="italic">{parts[1]}</span>{parts[2]}
        </h2>
      );
    }
    return (
      <h2 id="problem-title" className="type-h2 text-ink">
        {title}
      </h2>
    );
  };

  return (
    <Section id="problem" ariaLabelledBy="problem-title" hasTopRule={false}>
      <Container>
        {/* Eyebrow & Title */}
        <div className="max-w-[720px] mb-2">
          <Reveal variant="fade">
            <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.05}>
            {renderTitle()}
          </Reveal>
        </div>

        {/* 7/5 Split: Left Copy, Right Image + ScatterDiagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-2">
          {/* Left: 2 Paragraphs */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal variant="fadeUp" delay={0.1}>
              <p className="type-body text-[17px] text-ink-2 leading-relaxed">
                {paragraphs[0]}
              </p>
            </Reveal>
            <Reveal variant="fadeUp" delay={0.15}>
              <p className="type-body text-[17px] text-ink font-medium leading-relaxed">
                {paragraphs[1]}
              </p>
            </Reveal>
          </div>

          {/* Right: Noticeboard image + Scatter Diagram layered together */}
          <div className="lg:col-span-6 flex justify-center">
            <Reveal variant="fade" delay={0.1} className="w-full max-w-[480px]">
              <div className="relative">

                {/* Scatter Diagram Container */}
                <motion.div
                  className="bg-surface border border-line rounded-[12px] p-4 shadow-[0_1px_2px_rgba(11,18,32,0.04)] mt-4 relative overflow-hidden"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted mb-2 relative z-20">
                    OMS consolidates every channel →
                  </p>
                  
                  <div className="relative w-full aspect-[460/280]">
                    {/* SVG purely for animated dashed connecting lines */}
                    <svg
                      viewBox="0 0 460 280"
                      className="absolute inset-0 w-full h-full z-0"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      {chipNodes.map((chip, idx) => {
                        const chipCenter = {
                          x: chip.x + chip.chipW / 2,
                          y: chip.y + chip.chipH / 2,
                        };
                        const pathData = `M ${chipCenter.x} ${chipCenter.y} L ${center.x} ${center.y}`;

                        return (
                          <motion.path
                            key={`path-${idx}`}
                            d={pathData}
                            stroke="var(--line-strong)"
                            strokeWidth="1.25"
                            strokeDasharray="4 4"
                            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{
                              duration: 0.6,
                              delay: 0.4 + idx * 0.08,
                              ease: "easeInOut",
                            }}
                          />
                        );
                      })}
                    </svg>

                    {/* Peripheral Chips as absolute HTML nodes (popping in) */}
                    {chipNodes.map((chip, idx) => (
                      <motion.div
                        key={`chip-${idx}`}
                        className="absolute bg-surface border border-line shadow-sm rounded-[6px] flex items-center justify-center z-10"
                        style={{
                          left: `${(chip.x / 460) * 100}%`,
                          top: `${(chip.y / 280) * 100}%`,
                          width: `${(chip.chipW / 460) * 100}%`,
                          height: `${(chip.chipH / 280) * 100}%`,
                        }}
                        initial={{ opacity: 0, scale: 0.4 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.5, 
                          type: "spring",
                          bounce: 0.4,
                          delay: idx * 0.08 
                        }}
                      >
                        <span className="text-[11px] font-medium text-ink">
                          {chip.name}
                        </span>
                      </motion.div>
                    ))}

                    {/* Central Node popping in last */}
                    <motion.div
                      className="absolute bg-brand-600 rounded-[8px] flex items-center justify-center shadow-lg shadow-brand-600/30 z-20"
                      style={{
                        left: `${((center.x - 90) / 460) * 100}%`,
                        top: `${((center.y - 19) / 280) * 100}%`,
                        width: `${(180 / 460) * 100}%`,
                        height: `${(38 / 280) * 100}%`,
                      }}
                      initial={{ opacity: 0, scale: 0.4 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.6, 
                        type: "spring",
                        bounce: 0.5,
                        delay: 1.0 
                      }}
                    >
                      <span className="font-mono text-[11px] font-bold text-white uppercase text-center w-full leading-tight px-2">
                        {centralNode}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>

              </div>
            </Reveal>
          </div>
        </div>

        {/* Hairline Rule Above Principle Cards */}
        <div className="w-full border-t border-line pt-2">
          {/* Three Principle Cards: TRUST, STRUCTURE, SCALE (NO ICONS) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {principles.map((item, idx) => (
              <Reveal key={item.title} variant="fadeUp" delay={idx * 0.08}>
                <div className="bg-surface border border-line rounded-[12px] p-[28px] h-full flex flex-col justify-start transition-all duration-180 hover:border-line-strong hover:-translate-y-[2px] hover:shadow-[0_1px_2px_rgba(11,18,32,0.04),0_8px_24px_-12px_rgba(11,18,32,0.10)]">
                  <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-brand-600 font-semibold mb-3 block">
                    {item.title}
                  </span>
                  <p className="text-[15px] text-ink-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Old Way vs New Way Visual */}
        <Reveal variant="fadeUp" delay={0.2}>
          <div className="mt-16 bg-surface border border-line rounded-[16px] overflow-hidden shadow-[0_4px_24px_rgba(11,18,32,0.04)]">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-line">
              {/* The Old Way */}
              <div className="p-8 md:p-12 relative overflow-hidden bg-surface-sunk/30">
                <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-danger font-semibold mb-8 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-danger animate-pulse"></span>
                  The Old Way (Chaos)
                </h3>
                
                <div className="relative h-[200px] w-full flex items-center justify-center">
                  {/* Messy floating elements */}
                  <motion.div 
                    animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-4 left-4 bg-surface border border-line-strong p-3 rounded-lg shadow-sm z-10"
                  >
                    <span className="text-[12px] font-medium text-ink">WhatsApp Group</span>
                  </motion.div>
                  
                  <motion.div 
                    animate={{ y: [0, 15, 0], x: [0, -5, 0], rotate: [0, 8, 0] }} 
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-6 left-12 bg-surface border border-line-strong p-3 rounded-lg shadow-sm z-20"
                  >
                    <span className="text-[12px] font-medium text-ink">Google Form</span>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, -8, 0], x: [0, 10, 0], rotate: [0, -3, 0] }} 
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute top-10 right-8 bg-surface border border-line-strong p-3 rounded-lg shadow-sm z-10"
                  >
                    <span className="text-[12px] font-medium text-ink">Instagram Story</span>
                  </motion.div>

                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }} 
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute z-30"
                  >
                    <div className="bg-danger/10 text-danger border border-danger/20 rounded-full px-4 py-2 font-mono text-[12px] font-bold backdrop-blur-sm">
                      Status: Fragmented
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* The SkillLinkr Way */}
              <div className="p-8 md:p-12 relative overflow-hidden bg-brand-900 text-surface">
                <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-brand-100 font-semibold mb-8 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
                  The SkillLinkr Way (Order)
                </h3>

                <div className="relative h-[200px] w-full flex flex-col items-center justify-center gap-4">
                  {/* Straight pipeline */}
                  <div className="flex items-center gap-3 w-full max-w-[300px] relative">
                    
                    {/* Flow line background */}
                    <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-[2px] bg-brand-700"></div>
                    
                    {/* Animated data packet */}
                    <motion.div 
                      animate={{ left: ["10%", "90%"] }} 
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                      className="absolute top-1/2 -translate-y-1/2 h-[4px] w-[20px] rounded-full bg-brand-100 shadow-[0_0_12px_#176B52]"
                    ></motion.div>

                    <div className="z-10 bg-[#0A241C] border border-brand-700 text-brand-100 px-3 py-2 rounded font-mono text-[11px] font-medium shadow-md">
                      Society
                    </div>
                    <div className="flex-1"></div>
                    <div className="z-10 bg-[#0A241C] border border-brand-700 text-brand-100 px-3 py-2 rounded font-mono text-[11px] font-medium shadow-md">
                      Ambassador
                    </div>
                    <div className="flex-1"></div>
                    <div className="z-10 bg-brand-600 border border-brand-100 text-surface px-3 py-2 rounded font-mono text-[11px] font-bold shadow-[0_0_12px_#176B52] flex items-center gap-1">
                      Feed
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <div className="inline-block bg-brand-600/20 text-brand-100 border border-brand-600/50 rounded-full px-4 py-2 font-mono text-[12px] font-bold">
                      Status: Published
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
};
