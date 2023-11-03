import { extname, normalize } from 'path';
import 'server-only';

export interface DriverPutOptions {
  dir?: string;
  fileName?: string;
}

export interface Driver {
  /**
   * Put file to storage.
   * Overwrite if file exists.
   * @returns file name
   */
  put: (file: File, options: DriverPutOptions) => Promise<string>;
  remove: (path: string) => Promise<void>;
  exists: (path: string) => Promise<boolean>;
  url: (path: string) => Promise<string>;
}

export function generateFileName(file: File): string {
  return `${crypto.randomUUID()}${extname(file.name)}`;
}

export function concatPath(...paths: string[]): string {
  return normalize(
    paths
      .filter((path) => path !== '')
      .map((path) => path.replace(/^\/|\/$/g, ''))
      .join('/'),
  );
}
