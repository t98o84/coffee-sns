import { authenticated } from '@/features/auth/shared/actions';
import { ProfileForm } from '@/features/auth/shared/ui/components/forms/profile-form';
import { Stack, Typography } from '@/lib/ui/components';

export default async function Profile() {
  const session = await authenticated();

  return (
    <Stack spacing="gap-8 w-full">
      <Typography variant="h2" component="h2">
        プロフィール
      </Typography>
      <Stack className="max-w-xl">
        <ProfileForm
          profile={{
            name: session.user.name ?? undefined,
            username: session.user.username,
            avatar: session.user.avatarUrl,
            introduction: session.user.introduction ?? undefined,
          }}
        />
      </Stack>
    </Stack>
  );
}
