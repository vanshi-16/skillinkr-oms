import React, { useState } from 'react';
import { ShieldCheck, GraduationCap, Building2, ChevronDown } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { content, RoleCard } from '../../data/content';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Eyebrow } from '../primitives/Eyebrow';
import { Reveal } from '../primitives/Reveal';

const TiltCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000, height: '100%' }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={reduce ? undefined : {
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group bg-surface border border-line rounded-[12px] p-[28px] text-left transition-all duration-180 hover:border-line-strong hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(11,18,32,0.08),0_12px_32px_-12px_rgba(11,18,32,0.12)] flex flex-col justify-start h-full cursor-default"
      >
        <div style={reduce ? undefined : { transform: "translateZ(30px)" }} className="flex flex-col h-full w-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export const Roles: React.FC = () => {
  const { eyebrow, title, body, cards, bottomBand } = content.roles;
  const [activeMobileCard, setActiveMobileCard] = useState<string | null>(null);

  const getIcon = (iconName: RoleCard['icon']) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck size={20} strokeWidth={1.5} className="text-ink" aria-hidden="true" />;
      case 'GraduationCap':
        return <GraduationCap size={20} strokeWidth={1.5} className="text-ink" aria-hidden="true" />;
      case 'Building2':
        return <Building2 size={20} strokeWidth={1.5} className="text-ink" aria-hidden="true" />;
      default:
        return null;
    }
  };

  const toggleMobileCard = (id: string) => {
    setActiveMobileCard((prev) => (prev === id ? null : id));
  };

  const renderTitle = () => {
    const parts = title.split('*');
    if (parts.length === 3) {
      return (
        <h2 id="roles-title" className="type-h2 text-ink mb-4">
          {parts[0]}<span className="italic">{parts[1]}</span>{parts[2]}
        </h2>
      );
    }
    return (
      <h2 id="roles-title" className="type-h2 text-ink mb-4">
        {title}
      </h2>
    );
  };

  return (
    <Section id="roles" ariaLabelledBy="roles-title">
      <Container>
        {/* Section Header Pattern: 7-col cell */}
        <div className="max-w-[760px] mb-10">
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

        <div className="hidden sm:grid sm:grid-cols-3 gap-6 lg:gap-8 items-start mb-12">
          {cards.map((card, idx) => {
            const hasImage = true;
            const imageSrc = `/images/card-${card.id}.jpg`;

            return (
            <Reveal key={card.id} variant="fadeUp" delay={idx * 0.08} className="h-full">
              <TiltCard>
                <div className="mb-4 text-ink flex items-center justify-between z-10 relative">
                  {getIcon(card.icon)}
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    {card.roleLabel}
                  </span>
                </div>

                {hasImage && (
                  <div className="relative w-full aspect-[16/9] mb-5 rounded-lg overflow-hidden border border-line/50">
                    <img 
                      src={imageSrc} 
                      alt="" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}

                <h3 className="type-h3 text-ink mb-1">{card.title}</h3>
                <span className="text-[13px] text-muted mb-4 block font-medium">
                  {card.descriptor}
                </span>

                <p className="text-[14px] text-ink-2 leading-relaxed">
                  {card.body}
                </p>
              </TiltCard>
            </Reveal>
            );
          })}
        </div>

        {/* Mobile Accordion View */}
        <div className="sm:hidden space-y-4 mb-8">
          {cards.map((card) => {
            const isOpen = activeMobileCard === card.id;
            return (
              <div
                key={card.id}
                className="bg-surface border border-line rounded-[12px] p-5 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleMobileCard(card.id)}
                  className="w-full flex items-center justify-between text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    {getIcon(card.icon)}
                    <div>
                      <span className="font-mono text-[10px] uppercase text-muted block">
                        {card.roleLabel}
                      </span>
                      <h3 className="text-[16px] font-semibold text-ink">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown
                    size={18}
                    strokeWidth={1.5}
                    className={`transition-transform duration-200 text-muted ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pt-4 mt-3 border-t border-line group">
                    <div className="relative w-full aspect-[16/9] mb-4 rounded-lg overflow-hidden border border-line/50">
                      <img 
                        src={`/images/card-${card.id}.jpg`} 
                        alt="" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[12px] text-muted block mb-2 font-medium">
                      {card.descriptor}
                    </span>
                    <p className="text-[14px] text-ink-2 leading-relaxed">
                      {card.body}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Full-width --surface-sunk band with running text in 3 columns */}
        <Reveal variant="fadeUp" delay={0.15}>
          <div className="w-full bg-surface-sunk border border-line rounded-[12px] p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[14px] text-ink-2 leading-relaxed">
              {bottomBand.map((item, idx) => (
                <div key={idx} className="border-l-2 border-line-strong pl-4">
                  <span className="font-sans font-semibold text-ink block mb-1.5">
                    {item.role}
                  </span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
};
