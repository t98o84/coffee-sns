import { config } from '@/features/auth/server/config';
import NextAuth from 'next-auth';
import 'server-only';

export * from '@/features/auth/server/config';

export const {
  auth,
  handlers,
  signIn,
  signOut,
  update: updateSession,
} = NextAuth(config);
