import * as process from 'process';

export function getOrThrow(key: string) {
  const value = process.env[key];
  if (value) {
    return value;
  }

  throw new Error(`${key} did not exists env`);
}

export function getOrDefault<T extends string | undefined = undefined>(
  key: string,
  defaultValue?: T,
): T {
  return (process.env[key] ?? defaultValue) as T;
}
