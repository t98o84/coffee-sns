import { auth } from '@/features/auth/server';
import { redirect } from 'next/navigation';

/**
 * Guest user only
 */
export async function guest() {
  const session = await auth();
  if (session) {
    redirect(`/user/${session.user.username}`);
  }
}

export async function authenticated() {
  if (!(await auth())) {
    redirect('/auth/sign-in');
  }
}
