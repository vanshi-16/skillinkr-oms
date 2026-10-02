import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={`mx-auto w-full max-w-[1200px] px-5 sm:px-10 lg:px-16 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
