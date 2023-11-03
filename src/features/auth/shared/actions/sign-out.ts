'use server';

import { signOut as signOutNextAuth } from '@/features/auth/server';
import { handleAction } from '@/lib/actions/server';
import { makeSuccessResponse } from '@/lib/actions/shared';

export async function signOut() {
  return handleAction(async () => {
    console.log('signOut');
    await signOutNextAuth();

    return makeSuccessResponse();
  });
}
