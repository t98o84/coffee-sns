import type {DefaultSession as AuthCoreDefaultSession} from '@auth/core/types';
import {DefaultSession as NextAuthDefaultSession} from "next-auth"
import {UserModel} from "@/features/auth/shared/models";

interface ExtendUser {
  username: UserModel['username'];
  introduction: UserModel['introduction'];
  avatarUrl?: string
}

declare module '@auth/core/types' {
  interface Session {
    user: ExtendUser & AuthCoreDefaultSession['user']
  }
}

declare module '@auth/core/adapters' {
  interface AdapterUser extends UserModel {
  }
}

declare module 'next-auth' {
  interface Session {
    user: ExtendUser & NextAuthDefaultSession['user']
  }
}
