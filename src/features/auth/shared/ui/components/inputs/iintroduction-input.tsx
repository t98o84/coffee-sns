import { TextAreaWithLabel, TextareaWithLabelProps } from '@/lib/ui/components';
import React from 'react';

export interface IntroductionInputProps
  extends Partial<TextareaWithLabelProps> {}

export function IntroductionInput(props: IntroductionInputProps) {
  return (
    <TextAreaWithLabel
      name="introduction"
      required
      label="自己紹介"
      {...props}
    />
  );
}
