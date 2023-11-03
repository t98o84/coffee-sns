import { db } from '@/lib/database';
import { isDiskType, makeDisk } from '@/lib/filesystems/server';
import { FileModel } from '@/lib/filesystems/shared';

export interface BuildFileUrlUsecaseParams {
  file: string | FileModel;
}

export async function buildFileUrlUsecase({
  file,
}: BuildFileUrlUsecaseParams): Promise<string> {
  const fileModel =
    typeof file === 'string'
      ? await db.file.findUniqueOrThrow({ where: { id: file } })
      : file;

  if (!isDiskType(fileModel.disk)) {
    throw new Error(`Invalid disk type: ${fileModel.disk}`);
  }

  const disk = makeDisk(fileModel.disk);

  const path = fileModel.path
    ? `${fileModel.path}/${fileModel.name}`
    : fileModel.name;

  return disk.url(path);
}
