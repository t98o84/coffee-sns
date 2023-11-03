import { Jsonable } from '@/lib/utils';

export interface ErrorBaseParams {
  message: string;
  code: string;
}

export interface ErrorBaseJsonResult {
  message: string;
  code: string;
}

export class ErrorBase extends Error implements Jsonable {
  code: string;

  constructor({ message, code }: ErrorBaseParams) {
    super(message);
    this.code = code;
  }

  public toJson(): ErrorBaseJsonResult {
    return {
      message: this.message,
      code: this.code,
    };
  }
}
