import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  SquareUser,
  Building,
  FilePlus2,
  GitPullRequestArrow,
  Zap,
  Activity,
  Bell,
  ScrollText,
  Radio,
  Network,
} from 'lucide-react';
import { content, CapabilityItem } from '../../data/content';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Eyebrow } from '../primitives/Eyebrow';
import { Reveal } from '../primitives/Reveal';
import { SPRING_SNAPPY } from '../../lib/motion';

export const Capabilities: React.FC = () => {
  const { eyebrow, title, body, items } = content.capabilities;
  const [hovered, setHovered] = useState<number | null>(null);

  const renderIcon = (icon: CapabilityItem['icon']) => {
    const props = { size: 20, strokeWidth: 1.5, className: 'text-ink flex-shrink-0 mt-0.5', 'aria-hidden': true as const };
    switch (icon) {
      case 'SquareUser': return <SquareUser {...props} />;
      case 'Building': return <Building {...props} />;
      case 'FilePlus2': return <FilePlus2 {...props} />;
      case 'GitPullRequestArrow': return <GitPullRequestArrow {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Activity': return <Activity {...props} />;
      case 'Bell': return <Bell {...props} />;
      case 'ScrollText': return <ScrollText {...props} />;
      case 'Radio': return <Radio {...props} />;
      case 'Network': return <Network {...props} />;
      default: return null;
    }
  };

  return (
    <Section id="capabilities" ariaLabelledBy="capabilities-title">
      <Container>
        {/* Section Header */}
        <div className="max-w-[760px] mb-8">
          <Reveal variant="fade">
            <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.05}>
            <h2 id="capabilities-title" className="type-h2 text-ink mb-4">
              {title}
            </h2>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.1}>
            <p className="type-body text-[17px] text-ink-2 max-w-[68ch]">
              {body}
            </p>
          </Reveal>
        </div>

        {/* 2-col × 5-row hairline-ruled list with layoutId="cap-rail" */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-line">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              className={`relative border-b border-line transition-colors duration-200 ${
                i % 2 === 0 ? 'md:border-r' : ''
              } ${hovered === i ? 'bg-surface' : ''}`}
            >
              {/* layoutId rail — renders only in the hovered row so Framer morphs it */}
              {hovered === i && (
                <motion.span
                  layoutId="cap-rail"
                  className="absolute inset-y-0 left-0 w-[2px] bg-brand-600"
                  transition={SPRING_SNAPPY}
                />
              )}

              <div className="flex items-start gap-4 px-6 sm:px-7 py-6 sm:py-7">
                {renderIcon(item.icon)}
                <div>
                  <p className="font-sans font-medium text-[1rem] text-ink leading-snug mb-1">
                    {item.title}
                  </p>
                  <p className="text-[14px] text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
