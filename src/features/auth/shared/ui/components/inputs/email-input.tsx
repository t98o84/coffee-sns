import {
  TextInputWithLabel,
  TextInputWithLabelProps,
} from '@/lib/ui/components';
import React from 'react';

export interface EmailInputProps extends Partial<TextInputWithLabelProps> {}

export function EmailInput(props: EmailInputProps) {
  return (
    <TextInputWithLabel
      type="email"
      name="email"
      required
      label="メールアドレス"
      placeholder="name@flowbite.com"
      {...props}
    />
  );
}
