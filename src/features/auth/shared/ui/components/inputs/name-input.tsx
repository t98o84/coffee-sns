import {
  TextInputWithLabel,
  TextInputWithLabelProps,
} from '@/lib/ui/components';
import React from 'react';

export interface NameInputProps extends Partial<TextInputWithLabelProps> {}

export function NameInput(props: NameInputProps) {
  return (
    <TextInputWithLabel
      type="text"
      name="name"
      required
      label="名前"
      {...props}
    />
  );
}
