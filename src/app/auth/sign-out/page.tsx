import { authenticated } from '@/features/auth/shared/actions';
import { SignOutButton } from '@/features/auth/shared/ui/components/buttons/sign-out-button';
import { CoffassIcon, Stack, Typography } from '@/lib/ui/components';
import { Container } from '@/lib/ui/components/layouts/container';

export default async function SignOut() {
  await authenticated();

  return (
    <main>
      <Container>
        <Stack className="mt-14" alignItems="items-center">
          <div className="flex justify-center">
            <CoffassIcon />
          </div>
          <Typography variant="h2" component="h1">
            サインアウト
          </Typography>
          <Typography>サインアウトしてもよろしいですか?</Typography>
          <SignOutButton />
        </Stack>
      </Container>
    </main>
  );
}
