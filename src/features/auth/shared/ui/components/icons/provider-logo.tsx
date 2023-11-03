import { FcGoogle } from 'react-icons/fc';

export interface ProviderLogoProps {
  provider: string;
}

export function ProviderLogo(props: ProviderLogoProps) {
  switch (props.provider) {
    case 'google':
      return <FcGoogle className="mr-2 h-5 w-5" />;
    case 'email':
    default:
      return null;
  }
}
