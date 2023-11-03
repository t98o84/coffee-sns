'use server';

import { signIn } from '@/features/auth/server';
import { guest } from '@/features/auth/shared/actions';
import { handleAction } from '@/lib/actions/server';
import { makeSuccessResponse } from '@/lib/actions/shared';
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email(),
});

export async function signInByEmail(_: unknown, data: FormData) {
  return handleAction(async () => {
    await guest();

    const validated = emailSchema.parse(Object.fromEntries(data));

    await signIn('email', validated);

    return makeSuccessResponse();
  });
}
