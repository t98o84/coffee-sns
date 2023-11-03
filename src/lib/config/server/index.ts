import { getOrThrow } from '@/lib/config/shared';
import 'server-only';

export interface AppConfig {
  appName: string;
  appUrl: string;
  projectRoot: string;
}

export function makeAppConfig(): AppConfig {
  return {
    appName: getOrThrow('APP_NAME'),
    appUrl: getOrThrow('APP_URL'),
    projectRoot: getOrThrow('PROJECT_ROOT'),
  };
}
