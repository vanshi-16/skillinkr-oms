import React from 'react';
import { ArrowRight } from 'lucide-react';
import { content } from '../../data/content';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Eyebrow } from '../primitives/Eyebrow';
import { Reveal } from '../primitives/Reveal';

export const CTA: React.FC = () => {
  const { eyebrow, title, body, columns, tagline } = content.cta;

  return (
    <Section id="cta" ariaLabelledBy="cta-title" className="!pb-8 !pt-10">
      <Container>
        {/* Section Header */}
        <div className="max-w-[760px] mb-6">
          <Reveal variant="fade">
            <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.05}>
            <h2 id="cta-title" className="type-h2 text-ink mb-4">
              {title}
            </h2>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.1}>
            <p className="type-body text-[17px] text-ink-2 max-w-[68ch]">
              {body}
            </p>
          </Reveal>
        </div>

        {/* 3-Column Hairline-Ruled CTA Block (no cards, no colored boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-line border-t border-b border-line py-6 mb-6">
          {columns.map((col, idx) => (
            <Reveal
              key={col.audience}
              variant="fadeUp"
              delay={idx * 0.08}
              className={`flex flex-col justify-between py-6 md:py-2 px-0 md:px-8 ${
                idx === 0 ? 'md:pl-0' : ''
              } ${idx === columns.length - 1 ? 'md:pr-0' : ''}`}
            >
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink font-bold block mb-3">
                  {col.audience}
                </span>
                <p className="text-[15px] text-ink font-medium leading-relaxed mb-4">
                  {col.audience === 'SOCIETIES' &&
                    'List events, hackathons, and recruitment drives for verified student distribution.'}
                  {col.audience === 'CAMPUS AMBASSADORS' &&
                    'Lead verification and opportunity governance for your college institution.'}
                  {col.audience === 'AUTHORIZED USERS' &&
                    'Access your verified portal workspace, active queues, and administration controls.'}
                </p>
              </div>

              <div>
                <a
                  href={col.href}
                  target={col.isExternal ? '_blank' : undefined}
                  rel={col.isExternal ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center text-[15px] font-semibold text-brand-600 hover:text-brand-700 transition-colors group focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-3 rounded"
                >
                  <span>{col.label}</span>
                  <ArrowRight
                    size={16}
                    strokeWidth={2}
                    className="ml-2 transition-transform duration-160 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Centered Mono 11px Line in --muted */}
        <div className="text-center">
          <p className="font-mono text-[12px] text-ink font-medium tracking-tight">
            {tagline}
          </p>
        </div>
      </Container>
    </Section>
  );
};
