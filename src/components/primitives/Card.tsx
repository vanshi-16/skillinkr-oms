import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  as: Component = 'div',
  interactive = true,
  ...props
}) => {
  const hoverStyles = interactive
    ? 'transition-all duration-180 hover:border-line-strong hover:-translate-y-[2px] hover:shadow-[0_1px_2px_rgba(11,18,32,0.04),0_8px_24px_-12px_rgba(11,18,32,0.10)]'
    : '';

  return (
    <Component
      className={`bg-surface border border-line rounded-[12px] p-[28px] ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
