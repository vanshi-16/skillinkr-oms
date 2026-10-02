import React from 'react';

export interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'muted' | 'brand';
  as?: 'p' | 'span' | 'div';
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  className = '',
  variant = 'muted',
  as: Component = 'p',
}) => {
  if (!children) return null;

  const colorClass = variant === 'brand' ? 'text-brand-600' : 'text-muted';

  return (
    <Component
      className={`font-mono text-[11px] uppercase tracking-[0.12em] font-medium leading-none ${colorClass} ${className}`}
    >
      {children}
    </Component>
  );
};
