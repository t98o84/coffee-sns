import { config } from '@/features/auth/shared/config';
import { guest } from '@/features/auth/shared/middlewares';
import { SignInForm } from '@/features/auth/shared/ui/components/forms/sign-in-form';
import { CoffassIcon, Stack, Typography } from '@/lib/ui/components';
import { Container } from '@/lib/ui/components/layouts/container';

export default async function SignIn() {
  await guest();
  const providers = config.providers;
  return (
    <Container>
      <div className="max-w-md mx-auto pt-8">
        <Stack spacing="gap-8">
          <div className="flex justify-center">
            <CoffassIcon />
          </div>
          <Typography variant="h2" component="h1" className="text-center">
            サインイン
          </Typography>
          <Stack>
            <SignInForm providers={providers} />
          </Stack>
        </Stack>
      </div>
    </Container>
  );
}
