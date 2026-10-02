import React from 'react';
import { Lock, Fingerprint, Monitor, Server, Database } from 'lucide-react';
import { motion } from 'motion/react';
import { content } from '../../data/content';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Eyebrow } from '../primitives/Eyebrow';
import { Reveal } from '../primitives/Reveal';

export const Governance: React.FC = () => {
  const { eyebrow, title, body, enforcementTable, statements, callout } =
    content.governance;

  const renderTitle = () => {
    const parts = title.split('*');
    if (parts.length === 3) {
      return (
        <h2 id="governance-title" className="type-h2 text-ink mb-4">
          {parts[0]}<span className="italic">{parts[1]}</span>{parts[2]}
        </h2>
      );
    }
    return (
      <h2 id="governance-title" className="type-h2 text-ink mb-4">
        {title}
      </h2>
    );
  };

  return (
    <Section id="governance" ariaLabelledBy="governance-title">
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

        {/* 5-col / 7-col Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-8">
          {/* Left 5-col: Enforcement Layers as animated cards */}
          <div className="lg:col-span-5">
            <Reveal variant="fadeUp" delay={0.1}>
              <div className="space-y-3">
                {[
                  {
                    icon: Fingerprint,
                    labelColor: '#176B52',
                    iconColor: '#176B52',
                    bg: '#FFFFFF',
                    border: '#E4E0D8',
                    layer: enforcementTable[0]?.layer ?? 'Identity',
                    rule: enforcementTable[0]?.rule ?? '',
                  },
                  {
                    icon: Monitor,
                    labelColor: '#176B52',
                    iconColor: '#176B52',
                    bg: '#FFFFFF',
                    border: '#E4E0D8',
                    layer: enforcementTable[1]?.layer ?? 'Interface',
                    rule: enforcementTable[1]?.rule ?? '',
                  },
                  {
                    icon: Server,
                    labelColor: '#176B52',
                    iconColor: '#176B52',
                    bg: '#FFFFFF',
                    border: '#E4E0D8',
                    layer: enforcementTable[2]?.layer ?? 'API / Server',
                    rule: enforcementTable[2]?.rule ?? '',
                  },
                  {
                    icon: Database,
                    labelColor: '#176B52',
                    iconColor: '#176B52',
                    bg: '#FFFFFF',
                    border: '#E4E0D8',
                    layer: enforcementTable[3]?.layer ?? 'Database / RLS',
                    rule: enforcementTable[3]?.rule ?? '',
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={item.layer}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: idx * 0.07 }}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className="flex items-start gap-4 rounded-[12px] p-4 border cursor-default"
                    style={{ background: item.bg, borderColor: item.border }}
                  >
                    {/* Icon badge */}
                    <div
                      className="flex-shrink-0 w-9 h-9 rounded-[8px] flex items-center justify-center mt-0.5"
                      style={{ background: 'rgba(23,107,82,0.12)', border: `1px solid ${item.border}` }}
                    >
                      <item.icon size={16} style={{ color: item.iconColor }} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0">
                      <span
                        className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold block mb-1"
                        style={{ color: item.labelColor }}
                      >
                        {item.layer}
                      </span>
                      <p className="text-[14px] text-ink font-semibold leading-snug">{item.rule}</p>
                    </div>

                    {/* Right glow dot */}
                    <div
                      className="flex-shrink-0 w-2 h-2 rounded-full ml-auto mt-1.5 animate-pulse"
                      style={{ background: item.iconColor, boxShadow: `0 0 6px ${item.iconColor}` }}
                    />
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right 7-col: Three example rules as numbered statements */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 pt-2">
            {statements.map((statement, idx) => (
              <Reveal key={idx} variant="fadeUp" delay={0.1 + idx * 0.06}>
                <div className="flex items-start p-4 rounded-[10px] bg-surface border border-line">
                  <p className="text-[15px] text-ink font-medium leading-relaxed">
                    {statement}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Callout: 1px left border in --brand-600, --brand-100 bg, 12px radius, Lock icon */}
        <Reveal variant="fadeUp" delay={0.2}>
          <div className="bg-brand-100 border border-brand-600/30 border-l-[3px] border-l-brand-600 rounded-[12px] p-5 sm:p-6 flex items-start gap-4">
            <Lock size={18} strokeWidth={1.5} className="text-brand-600 flex-shrink-0 mt-0.5" />
            <p className="text-[14px] text-brand-900 font-medium leading-relaxed">
              {callout}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
};
