import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { content } from '../../data/content';

export const MarqueeColleges: React.FC = () => {
  const { label, colleges } = content.marquee;
  const shouldReduceMotion = useReducedMotion();

  // Create a duplicated array for seamless infinite marquee loop
  const duplicatedColleges = [...colleges, ...colleges];

  return (
    <div className="w-full border-t border-b border-line py-6 overflow-hidden">
      {/* Label above */}
      <div className="text-center mb-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted font-medium">
          {label}
        </span>
      </div>

      {shouldReduceMotion ? (
        /* Reduced motion fallback: static wrapped row */
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6">
          {colleges.map((college, idx) => (
            <React.Fragment key={idx}>
              <span className="font-sans font-medium text-[15px] text-muted tracking-tight">
                {college}
              </span>
              {idx < colleges.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-line-strong" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      ) : (
        /* Infinite Marquee 40s linear loop with 60px fade mask */
        <div className="w-full overflow-hidden marquee-mask h-12 flex items-center">
          <motion.div
            className="flex items-center gap-6 whitespace-nowrap will-change-transform"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 40,
            }}
          >
            {duplicatedColleges.map((college, idx) => (
              <div key={idx} className="flex items-center gap-6">
                <span className="font-sans font-medium text-[15px] text-muted tracking-tight select-none">
                  {college}
                </span>
                <span
                  className="w-1 h-1 rounded-full bg-line-strong flex-shrink-0"
                  aria-hidden="true"
                />
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
};
