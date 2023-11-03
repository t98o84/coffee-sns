import {
  AlignItems,
  FlexDirection,
  FlexWrap,
  JustifyContent,
} from '@/lib/ui/components/tailwind';
import { PropsWithChildren } from 'react';

export interface StackProps extends PropsWithChildren {
  spacing?: string;
  direction?: FlexDirection;
  wrap?: FlexWrap;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  className?: string;
}

export function Stack({ children, ...props }: StackProps) {
  const { spacing, ...mergedProps } = {
    ...defaultStackProps,
    ...props,
  };

  return (
    <div
      className={`flex ${spacing} ${Object.values(mergedProps).join(' ')} ${
        props.className
      }`}
    >
      {children}
    </div>
  );
}

const defaultStackProps: StackProps = {
  spacing: 'gap-4',
  direction: 'flex-col',
  wrap: 'flex-nowrap',
  justifyContent: 'justify-stretch',
  alignItems: 'items-stretch',
};
