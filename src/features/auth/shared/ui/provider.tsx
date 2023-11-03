'use client';

import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { ReactNode } from 'react';

export interface AuthProvidersProps {
  children: ReactNode;
  session?: SessionProviderProps;
}

export function AuthProvider({ children, ...props }: AuthProvidersProps) {
  return <SessionProvider {...props.session}>{children}</SessionProvider>;
}
