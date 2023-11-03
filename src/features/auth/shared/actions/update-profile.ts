'use server';

import { updateSession } from '@/features/auth/server';
import { updateProfileUsecase } from '@/features/auth/server/usecases/update-profile-usecase';
import { authenticated } from '@/features/auth/shared/actions';
import {
  makeUsernameSchema,
  uploadAvatarSchema,
} from '@/features/auth/shared/schemas';
import { UserSchema } from '@/features/auth/shared/schemas';
import { handleAction } from '@/lib/actions/server';
import {
  FailureResponse,
  SuccessResponse,
  makeSuccessResponse,
} from '@/lib/actions/shared';
import {
  UnauthorizedErrorJsonResult,
  ValidationErrorJsonResult,
} from '@/lib/errors';
import { buildFileUrlUsecase } from '@/lib/filesystems/server/usecases/build-file-url-usecase';
import { z } from '@/lib/validations';

export type UpdateProfileSuccessResponse = SuccessResponse<null>;

export type UpdateProfileFailureResponse = FailureResponse<
  UnauthorizedErrorJsonResult | ValidationErrorJsonResult
>;

export type UpdateProfileResult = Awaited<ReturnType<typeof updateProfile>>;

export async function updateProfile(_: unknown, data: FormData) {
  return await handleAction<
    UpdateProfileSuccessResponse,
    UpdateProfileFailureResponse
  >(async () => {
    const session = await authenticated();

    const ProfileSchema = z.object({
      name: UserSchema.shape.name,
      username: makeUsernameSchema(session.user.username),
      avatar: uploadAvatarSchema,
      introduction: UserSchema.shape.introduction,
    });

    const avatar = data.get('avatar');
    if (avatar && avatar instanceof File && avatar.size === 0) {
      // ファイル未選択でもFileオブジェクトが存在するため、その場合は削除する
      data.delete('avatar');
    }

    const validated = await ProfileSchema.parseAsync(Object.fromEntries(data));

    const updatedUser = await updateProfileUsecase({
      user: session.user.id,
      profile: validated,
    });

    await updateSession({
      ...session,
      user: {
        ...session.user,
        name: updatedUser.name,
        username: updatedUser.username,
        introduction: updatedUser.introduction,
        avatarUrl:
          updatedUser.avatar &&
          (await buildFileUrlUsecase({ file: updatedUser.avatar })),
      },
    });

    // revalidate

    return makeSuccessResponse();
  });
}
