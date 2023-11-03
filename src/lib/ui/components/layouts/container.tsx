import { HTMLAttributes } from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div {...props} className={`container mx-auto ${className}`}>
      {children}
    </div>
  );
}
