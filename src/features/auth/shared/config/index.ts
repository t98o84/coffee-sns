export { useSession } from 'next-auth/react';

export interface AuthProvider {
  id: string;
  name: string;
  type: string;
}

export interface AuthConfig {
  image: {
    basePath: string;
  };
  pages: {
    signIn: string;
    signOut: string;
    error: string;
    verifyRequest: string;
    newUser: string;
  };
  providers: AuthProvider[];
}

export const config: AuthConfig = {
  image: {
    basePath: '/image/avatar',
  },
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-out',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/settings/profile', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    { id: 'google', name: 'Google', type: 'oidc' },
    { id: 'email', name: 'メールアドレス', type: 'email' },
  ],
};

export function isOAuthProvider(provider: AuthProvider): boolean {
  return provider.type === 'oauth' || provider.type === 'oidc';
}
