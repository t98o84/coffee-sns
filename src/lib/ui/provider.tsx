'use client';

import { theme } from '@/lib/ui/components';
import { Flowbite } from 'flowbite-react';
import { PropsWithChildren } from 'react';

export interface UiProviderProps extends PropsWithChildren {}

export function UiProvider({ children }: UiProviderProps) {
  return <Flowbite theme={{ theme }}>{children}</Flowbite>;
}
