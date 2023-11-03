'use client';

import { UsernameInput } from '@/features/auth/shared//ui/components/inputs/username-input';
import { updateProfile } from '@/features/auth/shared/actions/update-profile';
import { AvatarInput } from '@/features/auth/shared/ui/components/inputs/avatar-input';
import { IntroductionInput } from '@/features/auth/shared/ui/components/inputs/iintroduction-input';
import { NameInput } from '@/features/auth/shared/ui/components/inputs/name-input';
import { isFailureResponse, isSuccessResponse } from '@/lib/actions/shared';
import { extractMessages, isValidationErrorJsonResult } from '@/lib/errors';
import { Alert, Button, Stack } from '@/lib/ui/components';
import React, { useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

export interface Profile {
  name?: string;
  username?: string;
  introduction?: string;
  avatar?: string;
}

export interface ProfileFormProps {
  profile?: Profile;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useFormState(updateProfile, null);

  if (isSuccessResponse(state)) {
    formRef.current?.reset();
  }

  return (
    <form action={action} ref={formRef}>
      <Stack>
        {isSuccessResponse(state) && (
          <Alert color="success">プロフィールを更新しました</Alert>
        )}

        {isFailureResponse(state) && (
          <Alert color="failure">{state.data?.message}</Alert>
        )}

        <AvatarInput
          image={profile?.avatar}
          helperText={
            isFailureResponse(state) && isValidationErrorJsonResult(state.data)
              ? extractMessages(['image'], state.data.errors).join('\n')
              : undefined
          }
        />

        <NameInput
          defaultValue={profile?.name}
          helperText={
            isFailureResponse(state) && isValidationErrorJsonResult(state.data)
              ? extractMessages(['name'], state.data.errors).join('\n')
              : undefined
          }
        />

        <UsernameInput
          defaultValue={profile?.username}
          helperText={
            isFailureResponse(state) && isValidationErrorJsonResult(state.data)
              ? extractMessages(['username'], state.data.errors).join('\n')
              : undefined
          }
        />

        <IntroductionInput
          defaultValue={profile?.introduction}
          helperText={
            isFailureResponse(state) && isValidationErrorJsonResult(state.data)
              ? extractMessages(['introduction'], state.data.errors).join('\n')
              : undefined
          }
        />

        <SubmitButton />
      </Stack>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      isProcessing={pending}
      className="max-w-fit"
      color="blue"
    >
      更新する
    </Button>
  );
}
