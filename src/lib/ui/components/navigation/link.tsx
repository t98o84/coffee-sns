'use client';

import { Button, ButtonProps } from 'flowbite-react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

export interface LinkProps<RouteInferType = unknown>
  extends NextLinkProps<RouteInferType> {
  children: React.ReactNode;
  className?: string;
}

export function Link({ children, className, ...props }: LinkProps) {
  return (
    <NextLink
      className={`text-blue-500 hover:underline ${className}}`}
      {...props}
    >
      {children}
    </NextLink>
  );
}

export interface LinkButtonProps<RouteInferType = unknown>
  extends LinkProps<RouteInferType> {
  buttonProps?: ButtonProps;
}

export function LinkButton({
  children,
  buttonProps,
  ...props
}: LinkButtonProps) {
  'use client';
  return (
    <NextLink {...props}>
      <Button {...buttonProps}>{children}</Button>
    </NextLink>
  );
}
