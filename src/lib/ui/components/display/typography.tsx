import type { PropsWithChildren } from 'react';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface TypographyProps<T extends TypographyComponent>
  extends PropsWithChildren,
    ComponentProps<T> {
  component?: TypographyComponent;
  variant?: TypographyVariant;
}

export function Typography<T extends TypographyComponent = 'p'>({
  children,
  variant,
  component,
  ...props
}: TypographyProps<T>) {
  const resolvedVariant = variant ?? 'p';
  const resolvedComponent = component ?? pickComponent(resolvedVariant);
  const className = props.className
    ? `${pickClassName(resolvedVariant)} ${props.className}`
    : pickClassName(resolvedVariant);

  return React.createElement(
    resolvedComponent,
    { ...props, className },
    children,
  );
}

function pickComponent(variant: TypographyVariant): TypographyComponent {
  const components = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    p: 'p',
    caption: 'span',
    button: 'span',
  } as const;

  return components[variant];
}

function pickClassName(variant: TypographyVariant): string {
  const classNames = {
    h1: 'text-5xl font-extrabold ',
    h2: 'text-4xl font-bold',
    h3: 'text-3xl font-bold',
    h4: 'text-2xl font-bold',
    h5: 'text-xl font-bold',
    h6: 'text-lg font-bold',
    p: '',
    caption: 'text-sm font-medium text-gray-500',
    button: 'font-bold',
  } as const;

  return classNames[variant];
}

export type TypographyComponent =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'caption'
  | 'button';

type ComponentProps<T extends TypographyComponent> = DetailedHTMLProps<
  HTMLAttributes<ComponentPropsForComponent<T>>,
  ComponentPropsForComponent<T>
>;

type ComponentPropsForComponent<T extends TypographyComponent> = T extends
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  ? HTMLAttributes<HTMLHeadingElement>
  : T extends 'p'
  ? HTMLAttributes<HTMLParagraphElement>
  : T extends 'span'
  ? HTMLAttributes<HTMLSpanElement>
  : never;
