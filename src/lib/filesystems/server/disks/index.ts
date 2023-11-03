import { getOrDefault, getOrThrow } from '@/lib/config/shared';
import {
  Driver,
  LocalDriver,
  S3Driver,
} from '@/lib/filesystems/server/drivers';
import 'server-only';

export type Disk<T extends Driver = Driver> = T & { disk: DiskType };

export const diskTypes = {
  local: 'local',
  s3: 's3',
} as const;

export type DiskType = (typeof diskTypes)[keyof typeof diskTypes];

export function isDiskType(value: unknown): value is DiskType {
  return Object.values(diskTypes).includes(value as DiskType);
}

export function makeDisk(disk?: DiskType): Disk {
  return diskFactories[
    disk ?? getOrDefault('FILESYSTEM_DEFAULT_DISK', 'local')
  ]();
}

const diskFactories = {
  local: makeLocalDisk,
  s3: makeS3Disk,
} as const;

function makeLocalDisk(): Disk<LocalDriver> {
  return new (class LocalDisk extends LocalDriver {
    public readonly disk = diskTypes.local;
  })({
    root: getOrThrow('FILESYSTEM_LOCAL_ROOT'),
    url: getOrThrow('FILESYSTEM_LOCAL_URL'),
  });
}

function makeS3Disk(): Disk<S3Driver> {
  return new (class S3Disk extends S3Driver {
    public readonly disk = diskTypes.s3;
  })({
    bucket: getOrThrow('STORAGE_BUCKET'),
    key: getOrThrow('STORAGE_KEY'),
    secret: getOrThrow('STORAGE_SECRET'),
    region: getOrThrow('STORAGE_REGION'),
    url: getOrDefault('STORAGE_URL'),
  });
}
