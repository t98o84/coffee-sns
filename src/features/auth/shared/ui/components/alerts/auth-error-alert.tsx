'use client';

import { Alert } from 'flowbite-react';
import { useSearchParams } from 'next/navigation';

export function AuthErrorAlert() {
  const errorCode = useErrorCode();
  const errorMessage = getErrorMessage(errorCode ?? '');
  if (errorMessage === null) {
    return null;
  }

  return (
    <Alert color="failure">
      {errorMessage ?? 'An unknown error occurred.'}
    </Alert>
  );
}

export function useErrorCode() {
  return useSearchParams().get('error');
}

export function getErrorMessage(code: string): string | null {
  const messages: Record<string, string> = {
    signin: '別のアカウントでサインインしてみてください。',
    oauthsignin: '別のアカウントでサインインしてみてください。',
    oauthcallbackerror: '別のアカウントでサインインしてみてください。',
    oauthcreateaccount: '別のアカウントでサインインしてみてください。',
    emailcreateaccount: '別のアカウントでサインインしてみてください。',
    callback: '別のアカウントでサインインしてみてください。',
    oauthaccountnotlinked:
      'あなたの身元を確認するため、元々使用した同じアカウントでサインインしてください。',
    emailsignin: 'メールを送信できませんでした。',
    credentialssignin:
      'サインインに失敗しました。提供された詳細が正しいことを確認してください。',
    sessionrequired: 'このページにアクセスするにはサインインしてください。',
  };

  return messages[code.toLowerCase()] ?? null;
}
