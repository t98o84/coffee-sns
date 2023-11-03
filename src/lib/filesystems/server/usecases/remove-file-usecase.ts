import { db } from '@/lib/database';
import { DiskType, diskTypes, makeDisk } from '@/lib/filesystems/server';
import { FileModel } from '@/lib/filesystems/shared';

export interface RemoveFileUsecaseParams {
  /**
   * ID or File
   */
  file: string | FileModel;
}

export async function removeFileUsecase({
  file,
}: RemoveFileUsecaseParams): Promise<void> {
  const fileModel =
    typeof file === 'string'
      ? await db.file.findUnique({ where: { id: file } })
      : file;

  if (!fileModel) {
    return;
  }

  if (!Object.values(diskTypes).includes(fileModel.disk)) {
    throw new Error(`Invalid disk type: ${fileModel.disk}`);
  }

  const disk = makeDisk(fileModel.disk as DiskType);
  const path = fileModel.path
    ? `${fileModel.path}/${fileModel.name}`
    : fileModel.name;

  await Promise.all([
    disk.remove(path),
    db.file.delete({ where: { id: fileModel.id } }),
  ]);
}
