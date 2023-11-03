'use client';

import { signOut } from '@/features/auth/shared/actions/sign-out';
import { Button, ButtonProps } from '@/lib/ui/components';
import { useState } from 'react';

export interface SignOutButtonProps extends Omit<ButtonProps, 'children'> {}

export function SignOutButton(props: SignOutButtonProps) {
  const [pending, setPending] = useState(false);

  return (
    <Button
      onClick={() => {
        setPending(true);
        signOut().finally(() => setPending(false));
      }}
      disabled={pending}
      isProcessing={pending}
      color="dark"
      {...props}
    >
      ログアウト
    </Button>
  );
}
