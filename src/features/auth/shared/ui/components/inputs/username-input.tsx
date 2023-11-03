import {
  TextInputWithLabel,
  TextInputWithLabelProps,
} from '@/lib/ui/components';
import React from 'react';

export interface UsernameInputProps extends Partial<TextInputWithLabelProps> {}

export function UsernameInput(props: UsernameInputProps) {
  return (
    <TextInputWithLabel
      name="username"
      label="ユーザー名"
      type="text"
      required
      {...props}
    />
  );
}
