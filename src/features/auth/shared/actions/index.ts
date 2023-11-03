'use server';

import { auth as nextAuth } from '@/features/auth/server';
import { UnauthorizedError } from '@/lib/errors';
import { redirect } from 'next/navigation';

export async function guest() {
  const session = await nextAuth();
  if (session) {
    redirect(`/user/${session.user.username}`);
  }
}

type AuthenticatedActions = {
  redirect: () => never;
  throwError: () => never;
  getError: () => UnauthorizedError;
};

const authenticatedActions: AuthenticatedActions = {
  redirect: () => redirect('/auth/sign-in'),
  throwError: () => {
    throw new UnauthorizedError();
  },
  getError: () => new UnauthorizedError(),
};

export async function authenticated<
  T extends keyof AuthenticatedActions = 'redirect',
>(actionType: T = 'redirect' as T) {
  const session = await nextAuth();
  if (!session) {
    return authenticatedActions[actionType]() as ReturnType<
      AuthenticatedActions[T]
    >;
  }

  return session;
}

export async function auth() {
  return nextAuth();
}
