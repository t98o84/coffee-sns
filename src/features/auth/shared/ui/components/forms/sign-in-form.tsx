import { AuthProvider } from '@/features/auth/shared/config';
import { AuthErrorAlert } from '@/features/auth/shared/ui/components/alerts/auth-error-alert';
import { OauthButtons } from '@/features/auth/shared/ui/components/buttons/oauth-buttons';
import { EmailLinkForm } from '@/features/auth/shared/ui/components/forms/email-link-form';
import { Divider, Stack } from '@/lib/ui/components';

export interface SignInProps {
  providers: AuthProvider[];
}

export function SignInForm(props: SignInProps) {
  return (
    <Stack>
      <AuthErrorAlert />
      <OauthButtons providers={props.providers} />
      <Divider text="OR" />
      <EmailLinkForm />
    </Stack>
  );
}
