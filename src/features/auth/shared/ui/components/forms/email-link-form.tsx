'use client';

import { signInByEmail } from '@/features/auth/shared/actions/sign-in';
import { AuthButton } from '@/features/auth/shared/ui/components/buttons/auth-button';
import { EmailInput } from '@/features/auth/shared/ui/components/inputs/email-input';
import { isFailureResponse } from '@/lib/actions/shared';
import { Alert, Stack } from '@/lib/ui/components';
import { useFormState, useFormStatus } from 'react-dom';

export function EmailLinkForm() {
  const [state, formAction] = useFormState(signInByEmail, null);

  return (
    <form action={formAction}>
      <Stack>
        {isFailureResponse(state) && (
          <Alert color="failure">{state.data.message}</Alert>
        )}
        <EmailInput />
        <SubmitButton />
      </Stack>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <AuthButton
      provider={{ id: 'email', name: 'メールアドレス' }}
      type="submit"
      onClick={undefined}
      gradientDuoTone="purpleToBlue"
      isProcessing={pending}
      disabled={pending}
    />
  );
}
