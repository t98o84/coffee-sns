'use client';

import { ProviderLogo } from '@/features/auth/shared/ui/components/icons/provider-logo';
import { Button, ButtonProps } from '@/lib/ui/components';
import { signIn } from 'next-auth/react';

export interface AuthButtonProps extends ButtonProps {
  provider: {
    id: string;
    name: string;
  };
}

export function AuthButton({ provider, ...props }: AuthButtonProps) {
  return (
    <Button color="light" onClick={() => signIn(provider.id)} {...props}>
      <ProviderLogo provider={provider.id} />
      {provider.name}でサインイン
    </Button>
  );
}
