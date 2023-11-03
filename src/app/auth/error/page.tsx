import { config } from '@/features/auth/shared/config';
import {
  CoffassIcon,
  LinkButton,
  Stack,
  Typography,
} from '@/lib/ui/components';
import { Link } from '@/lib/ui/components';
import { Container } from '@/lib/ui/components/layouts/container';
import { ReactNode } from 'react';

export interface ErrorPageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ErrorPage(props: ErrorPageProps) {
  const error =
    typeof props.searchParams?.error === 'string'
      ? props.searchParams.error
      : 'default';

  const errors: Record<string, ReactNode> = {
    default: <DefaultError />,
    configuration: <ConfigurationError />,
    accessdenied: <AccessDeniedError />,
    verification: <VerificationError />,
  };

  const errorContents = errors[error.toLowerCase()] ?? errors.default;

  return (
    <Container>
      <div className="mt-14">
        <Stack alignItems="items-center">
          <CoffassIcon />
          {errorContents}
        </Stack>
      </div>
    </Container>
  );
}

function DefaultError() {
  return (
    <>
      <Typography variant="h2" component="h1">
        問題が発生しました。
      </Typography>
      <Typography>
        <Link className="site" href="/">
          トップページに戻る
        </Link>
      </Typography>
    </>
  );
}

function ConfigurationError() {
  return (
    <>
      <Typography variant="h2" component="h1">
        サーバーの設定に問題があります。
      </Typography>
      <Typography className="text-gray-700 mt-2">
        詳細情報についてはサーバーログを確認してください。
      </Typography>
    </>
  );
}

function AccessDeniedError() {
  return (
    <>
      <Typography variant="h2" component="h1">
        サインインする権限がありません。
      </Typography>
      <SignInLinkButton />
    </>
  );
}

export function VerificationError() {
  return (
    <>
      <Typography variant="h2" component="h1">
        サインインリンクが無効です。
      </Typography>
      <Typography className="text-gray-700 mt-2">
        既に使用されているか、期限切れの可能性があります。
      </Typography>
      <SignInLinkButton />
    </>
  );
}

function SignInLinkButton() {
  return (
    <LinkButton href={config.pages.signIn} buttonProps={{ color: 'dark' }}>
      サインイン
    </LinkButton>
  );
}
