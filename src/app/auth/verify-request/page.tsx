import { guest } from '@/features/auth/shared/actions';
import { config } from '@/features/auth/shared/config';
import {
  CoffassIcon,
  LinkButton,
  Stack,
  Typography,
} from '@/lib/ui/components';
import { Container } from '@/lib/ui/components/layouts/container';

export default async function VerifyRequest() {
  await guest();

  return (
    <main>
      <Container>
        <div className="flex justify-center mt-14">
          <EmailLinkVerifyRequest />
        </div>
      </Container>
    </main>
  );
}

function EmailLinkVerifyRequest() {
  return (
    <Stack alignItems="items-center">
      <CoffassIcon />
      <Typography variant="h2" component="h1">
        メールを確認してください
      </Typography>
      <div className="text-center">
        <Typography>
          サインイン用のリンクがあなたのメールアドレスに送信されました。
        </Typography>
        <Typography>
          もしメールが届かない場合は再度サインインページからメールを送信してください。
        </Typography>
      </div>
      <LinkButton href={config.pages.signIn} buttonProps={{ color: 'dark' }}>
        サインインページへ戻る
      </LinkButton>
    </Stack>
  );
}
