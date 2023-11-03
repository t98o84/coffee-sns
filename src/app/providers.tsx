import { AuthProvider } from '@/features/auth/shared/ui/provider';
import { UiProvider } from '@/lib/ui/provider';
import { PropsWithChildren } from 'react';

export interface ProvidersProps extends PropsWithChildren {}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <AuthProvider>
        <UiProvider>{children}</UiProvider>
      </AuthProvider>
    </>
  );
}
