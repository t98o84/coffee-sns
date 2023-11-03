import { db } from '@/lib/database';
import {
  allowImageMimeTypes,
  mimeTypeToExtensions,
} from '@/lib/filesystems/shared';
import { z } from 'zod';

export type { Account, Session, User, VerificationToken } from '@/lib/database';

export {
  // Account
  AccountSchema,
  AccountCreateInputSchema,
  AccountUpdateInputSchema,
  // Session
  SessionSchema,
  SessionCreateInputSchema,
  SessionUpdateInputSchema,
  // User
  UserSchema,
  UserCreateInputSchema,
  UserUpdateInputSchema,
  // VerificationToken
  VerificationTokenSchema,
  VerificationTokenCreateInputSchema,
  VerificationTokenUpdateInputSchema,
} from '@/lib/database';

export const makeUsernameSchema = (exclude: string) =>
  z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z0-9_]+$/)
    .refine(
      async (username: string) => {
        if (username === exclude) return true;
        return !(await db.user.findUnique({ where: { username } }));
      },
      () => ({
        message: `Username is already taken`,
      }),
    );

export const uploadAvatarSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= 1024 * 1024,
    `ファイルサイズが大きすぎます。1MB以下のファイルを選択してください`,
  )
  .refine(
    (file) => allowImageMimeTypes.includes(file.type),
    `${allowImageMimeTypes
      .map(mimeTypeToExtensions)
      .flat()
      .join(', ')}のいずれかの画像を選択してください`,
  )
  .optional();
