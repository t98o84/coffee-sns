import {
  Driver,
  DriverPutOptions,
  concatPath,
  generateFileName,
} from '@/lib/filesystems/server/drivers/driver';
import {
  DeleteObjectCommand,
  HeadObjectCommand,
  NotFound,
  S3Client,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import 'server-only';

export interface S3DriverOptions {
  bucket: string;
  root?: string;
  key: string;
  secret: string;
  region: string;
  url?: string;
}

export class S3Driver implements Driver {
  private readonly client: S3Client;

  public constructor(public readonly options: S3DriverOptions) {
    this.client = new S3Client({
      region: this.options.region,
      credentials: {
        accessKeyId: this.options.key,
        secretAccessKey: this.options.secret,
      },
    });
  }

  async put(file: File, options: DriverPutOptions): Promise<string> {
    const fileName = options.fileName ?? generateFileName(file);
    const key = this.concatPath(options.dir ?? '', fileName);

    const upload = new Upload({
      client: this.client,
      params: {
        Bucket: this.options.bucket,
        Key: key,
        Body: file.stream(),
      },
    });

    await upload.done();

    return fileName;
  }

  async remove(path: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.options.bucket,
      Key: this.concatPath(path),
    });

    await this.client.send(command);
  }

  async exists(path: string): Promise<boolean> {
    const command = new HeadObjectCommand({
      Bucket: this.options.bucket,
      Key: this.concatPath(path),
    });

    try {
      await this.client.send(command);
      return false;
    } catch (e) {
      if (e instanceof NotFound) {
        return true;
      }

      throw e;
    }
  }

  async url(path: string): Promise<string> {
    if (this.options.url) {
      return `${this.options.url}${path}`;
    }

    throw new Error('Implement (s3 and cloudfront)');
  }

  protected concatPath(...paths: string[]): string {
    return concatPath(this.options.root ?? '', ...paths);
  }
}
