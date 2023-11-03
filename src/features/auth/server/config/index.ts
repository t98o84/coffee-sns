import { config as sharedConfig } from '@/features/auth/shared/config';
import { getOrThrow } from '@/lib/config/shared';
import { db } from '@/lib/database';
import { buildFileUrlUsecase } from '@/lib/filesystems/server/usecases/build-file-url-usecase';
import type { AuthConfig } from '@auth/core';
import EmailProvider from '@auth/core/providers/email';
import GoogleProvider from '@auth/core/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import crypto from 'crypto';
import 'server-only';

const adapter = PrismaAdapter(db);

export const config: AuthConfig = {
  debug: false,
  session: { strategy: 'database' },
  secret: getOrThrow('NEXTAUTH_SECRET'),
  adapter: {
    ...adapter,
    async createUser(user) {
      const newUser = await db.user.create({
        data: {
          ...user,
          username: `user_${crypto.randomUUID().replace(/-/g, '')}`,
        },
      });
      if (newUser.email === null) {
        throw new Error('email is null');
      }

      return {
        ...newUser,
        email: newUser.email,
      };
    },
  },
  pages: sharedConfig.pages,
  providers: [
    GoogleProvider({
      clientId: getOrThrow('GOOGLE_CLIENT_ID'),
      clientSecret: getOrThrow('GOOGLE_CLIENT_SECRET'),
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      server: {
        host: getOrThrow('SMTP_HOST'),
        port: Number(getOrThrow('SMTP_PORT')),
        auth: {
          user: getOrThrow('SMTP_USER'),
          pass: getOrThrow('SMTP_PASSWORD'),
        },
      },
      from: getOrThrow('EMAIL_FROM'),
    }),
  ],
  callbacks: {
    async session(params) {
      if (!params.user) {
        throw new Error('User is null (session storage is not database?)');
      }

      return {
        ...params.session,
        user: {
          ...params.session.user,
          id: params.user.id,
          username: params.user.username,
          introduction: params.user.introduction,
          avatarUrl:
            params.user.avatarId &&
            (await buildFileUrlUsecase({ file: params.user.avatarId })),
        },
      };
    },
  },
  events: {},
};
