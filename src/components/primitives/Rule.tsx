import React from 'react';

export interface RuleProps {
  label?: string;
  className?: string;
  fullBleed?: boolean;
}

export const Rule: React.FC<RuleProps> = ({
  label,
  className = '',
  fullBleed = true,
}) => {
  if (label) {
    return (
      <div className={`relative flex items-center justify-center my-6 ${className}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-line" />
        </div>
        <div className="relative bg-canvas px-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          {label}
        </div>
      </div>
    );
  }

  return (
    <hr
      className={`border-0 border-t border-line ${fullBleed ? 'w-full' : ''} ${className}`}
      aria-hidden="true"
    />
  );
};
