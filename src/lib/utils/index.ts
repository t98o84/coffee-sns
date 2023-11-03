import { Jsonable } from '@/lib/utils/type';

export * from 'typesafe-utils';
export * from '@/lib/utils/type';

export function generateRandomStr(
  length: number,
  characters: string = 'abcdefghijklmnopqrstuvwxyz0123456789',
) {
  return Array.from({ length }).reduce((acc) => {
    return `${acc}${characters.charAt(
      Math.floor(Math.random() * characters.length),
    )}`;
  }, '');
}

export function extractChars(value: string, match: RegExp): string | null {
  return value.match(match)?.join('') ?? null;
}

export function isJsonable(value: unknown): value is Jsonable {
  return (
    typeof value === 'object' &&
    value !== null &&
    value === undefined &&
    !Array.isArray(value) &&
    typeof value['toJson'] === 'function'
  );
}
