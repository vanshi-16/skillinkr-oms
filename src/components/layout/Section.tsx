import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  ariaLabelledBy?: string;
  hasTopRule?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  id,
  ariaLabelledBy,
  hasTopRule = true,
  className = '',
  children,
  ...props
}) => {
  return (
    <>
      {hasTopRule && <div className="w-full border-t border-line" aria-hidden="true" />}
      <section
        id={id}
        aria-labelledby={ariaLabelledBy}
        className={`py-10 md:py-12 relative ${className}`}
        {...props}
      >
        {children}
      </section>
    </>
  );
};
