import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'lg';
  href?: string;
  trailingArrow?: boolean;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'sm',
  href,
  trailingArrow = false,
  children,
  className = '',
  target,
  rel,
  ...props
}) => {
  const heightClass = size === 'lg' ? 'h-12 px-6 text-[15px]' : 'h-10 px-4 text-[14px]';

  const baseStyles =
    'inline-flex items-center justify-center font-medium font-sans rounded-[10px] transition-all duration-160 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-3 disabled:opacity-50 disabled:cursor-not-allowed group';

  const variantStyles =
    variant === 'primary'
      ? 'bg-brand-600 text-white hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(23,107,82,0.22)] active:translate-y-0 active:shadow-none'
      : 'bg-transparent border border-line-strong text-ink hover:bg-surface hover:-translate-y-[1px] hover:shadow-[0_2px_8px_rgba(11,18,32,0.06)] active:translate-y-0';

  const content = (
    <>
      <span>{children}</span>
      {trailingArrow && (
        <ArrowRight
          size={16}
          strokeWidth={1.5}
          className="ml-2 transition-transform duration-160 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${baseStyles} ${heightClass} ${variantStyles} ${className}`}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={props.type || 'button'}
      className={`${baseStyles} ${heightClass} ${variantStyles} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
};
