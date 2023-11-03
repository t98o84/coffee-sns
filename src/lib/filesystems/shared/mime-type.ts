export const allowImageMimeTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
];

/**
 * { mime_type: extensions }
 */
export const mimeTypes = {
  'image/jpeg': ['jpeg'],
  'image/jpg': ['jpg'],
  'image/png': ['png'],
  'image/webp': ['webp'],
  'image/avif': ['avif'],
} as const;

export function mimeTypeToExtensions(mimeType: string): string[] | null {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return mimeTypes[mimeType] ?? null;
}
