import { config } from '@/features/auth/shared/config';
import { UserModel } from '@/features/auth/shared/models';
import { db } from '@/lib/database';
import { uploadFileUsecase } from '@/lib/filesystems/server/usecases/upload-file-usecase';
import { FileModel } from '@/lib/filesystems/shared';

export interface Profile {
  name?: UserModel['name'];
  username?: UserModel['username'];
  introduction?: UserModel['introduction'];
  avatar?: File;
}

export interface UpdateProfileUsecaseParams {
  user: UserModel | string;
  profile: Profile;
}

export async function updateProfileUsecase({
  user: target,
  profile,
}: UpdateProfileUsecaseParams): Promise<UserModel & { avatar?: FileModel }> {
  const user = await db.user.findUniqueOrThrow({
    where: { id: typeof target === 'string' ? target : target.id },
    include: { avatar: true },
  });

  let avatar: FileModel | undefined;
  if (profile.avatar) {
    avatar = await uploadFileUsecase({
      file: profile.avatar,
      dir: config.image.basePath,
      oldFile: user.avatarId ?? undefined,
    });
  }

  return {
    ...(await db.user.update({
      where: { id: user.id },
      data: {
        name: profile.name,
        username: profile.username,
        introduction: profile.introduction,
        avatarId: avatar?.id,
      },
    })),
    avatar: avatar ?? user.avatar ?? undefined,
  };
}
