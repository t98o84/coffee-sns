import { getOrThrow } from '@/lib/config/shared';

export interface AppConfig {
  appName: string;
  appUrl: string;
}

export function makeAppConfig(): AppConfig {
  return {
    appName: process.env.NEXT_PUBLIC_APP_NAME as string,
    appUrl: process.env.NEXT_PUBLIC_APP_URL as string,
  };
}
