import {
  Driver,
  DriverPutOptions,
  concatPath,
  generateFileName,
} from '@/lib/filesystems//server/drivers';
import fs from 'fs';
import path from 'path';
import 'server-only';

export interface LocalDriverOptions {
  root: string;
  url: string;
}

export class LocalDriver implements Driver {
  public constructor(public readonly options: LocalDriverOptions) {}

  public async put(file: File, options: DriverPutOptions): Promise<string> {
    const fileName = options.fileName || generateFileName(file);
    const filePath = this.concatPath(options.dir ?? '', fileName);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    const fileStream = fs.createWriteStream(filePath);
    const reader = file.stream().getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      fileStream.write(value);
    }

    return fileName;
  }

  public async remove(path: string): Promise<void> {
    if (await this.exists(path)) {
      fs.unlinkSync(this.concatPath(path));
    }
  }

  public async exists(path: string): Promise<boolean> {
    return fs.existsSync(this.concatPath(path));
  }

  public async url(path: string): Promise<string> {
    return `${this.options.url}/${path}`;
  }

  protected concatPath(...paths: string[]): string {
    return `/${concatPath(this.options.root, ...paths)}`;
  }
}
