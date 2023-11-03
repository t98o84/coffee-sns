import '@/features/auth/server';
import { AuthProvider, isOAuthProvider } from '@/features/auth/shared/config';
import { AuthButton } from '@/features/auth/shared/ui/components/buttons/auth-button';

export interface OauthProps {
  providers: AuthProvider[];
}

export function OauthButtons(props: OauthProps) {
  return (
    <>
      {props.providers
        .filter((provider) => isOAuthProvider(provider))
        .map((provider) => (
          <AuthButton key={provider.id} provider={provider} />
        ))}
    </>
  );
}
