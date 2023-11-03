import { db } from '@/lib/database';
import { Disk, DiskType, makeDisk } from '@/lib/filesystems/server';
import {
  RemoveFileUsecaseParams,
  removeFileUsecase,
} from '@/lib/filesystems/server/usecases/remove-file-usecase';
import { FileModel } from '@/lib/filesystems/shared';

export interface UploadFileUsecaseParams {
  file: File;
  dir?: string;
  disk?: Disk | DiskType;

  oldFile?: RemoveFileUsecaseParams['file'];
}

export async function uploadFileUsecase({
  file,
  dir,
  disk: diskType,
  oldFile,
}: UploadFileUsecaseParams): Promise<FileModel> {
  const disk =
    typeof diskType === 'string' || diskType === undefined
      ? makeDisk(diskType)
      : diskType;

  const fileName = await disk.put(file, { dir });
  const fileModel = await db.file.create({
    data: {
      name: fileName,
      originalName: file.name,
      path: dir,
      disk: disk.disk,
      size: file.size,
      mimeType: file.type,
    },
  });

  if (oldFile) {
    await removeFileUsecase({ file: oldFile });
  }

  return fileModel;
}
