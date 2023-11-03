import {
  ErrorBase,
  ErrorBaseJsonResult,
  ErrorBaseParams,
} from '@/lib/errors/error-base';
import { ZodError } from 'zod';

export interface HttpErrorBaseParams extends ErrorBaseParams {
  status: number;
}

export interface HttpErrorBaseJsonResult extends ErrorBaseJsonResult {
  status: number;
}

export class HttpErrorBase extends ErrorBase {
  status: number;

  constructor({ message, code, status }: HttpErrorBaseParams) {
    super({ message, code });
    this.status = status;
  }

  public toJson(): HttpErrorBaseJsonResult {
    return {
      ...super.toJson(),
      status: this.status,
    };
  }
}

//====================================================================================================
// Bad request error
//====================================================================================================
export interface BadRequestErrorParams {
  message?: string;
  code?: string;
}

export interface BadRequestErrorJsonResult extends HttpErrorBaseJsonResult {
  status: 400;
}

export class BadRequestError extends HttpErrorBase {
  constructor(params?: BadRequestErrorParams) {
    super({
      message: 'リクエスト内容に誤りがあります',
      code: BadRequestError.name,
      ...params,
      status: 400,
    });
  }

  public toJson(): BadRequestErrorJsonResult {
    return super.toJson() as BadRequestErrorJsonResult;
  }
}

//====================================================================================================
// Validation error
//====================================================================================================
export interface ValidationErrorDetail {
  code: string;
  path: (string | number)[];
  message: string;
}

export interface ValidationErrorParams {
  errors: ValidationErrorDetail[];
  message?: string;
  code?: string;
}

export interface ValidationErrorJsonResult extends BadRequestErrorJsonResult {
  status: 400;
  errors: ValidationErrorDetail[];
}

export class ValidationError extends BadRequestError {
  errors: ValidationErrorDetail[];

  constructor(params?: ValidationErrorParams) {
    super({
      code: ValidationError.name,
      ...params,
    });
    this.errors = params?.errors ?? [];
  }

  public toJson(): ValidationErrorJsonResult {
    return {
      ...super.toJson(),
      errors: this.errors,
    };
  }

  public addErrors(errors: ValidationErrorDetail[]) {
    this.errors.push(...errors);
  }

  public static fromZodError(error: ZodError): ValidationError {
    const errors = error.issues.map((issue) => {
      return {
        code: issue.code,
        path: issue.path,
        message: issue.message,
      };
    });

    return new ValidationError({ errors });
  }
}

export function isValidationErrorJsonResult(
  error: unknown,
): error is ValidationErrorJsonResult {
  console.log(
    typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      'errors' in error,
  );
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    error.status === 400 &&
    'errors' in error &&
    Array.isArray(error.errors) &&
    error.errors.every((error) => {
      return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        typeof error.code === 'string' &&
        'path' in error &&
        Array.isArray(error.path) &&
        'message' in error &&
        typeof error.message === 'string'
      );
    })
  );
}

export function extractErrors(
  path: ValidationErrorDetail['path'],
  errors: ValidationErrorDetail[],
): ValidationErrorDetail[] {
  return errors.filter((error) => {
    return error.path.join('.') === path.join('.');
  });
}

export function extractMessages(
  path: ValidationErrorDetail['path'],
  errors: ValidationErrorDetail[],
): string[] {
  return extractErrors(path, errors).map((error) => error.message);
}

//====================================================================================================
// Unauthorized error
//====================================================================================================
export interface UnauthorizedErrorParams {
  message?: string;
  code?: string;
}

export interface UnauthorizedErrorJsonResult extends HttpErrorBaseJsonResult {
  status: 401;
}

export class UnauthorizedError extends HttpErrorBase {
  constructor(params?: UnauthorizedErrorParams) {
    super({
      message: '認証に失敗しました',
      code: UnauthorizedError.name,
      ...params,
      status: 401,
    });
  }

  public toJson(): UnauthorizedErrorJsonResult {
    return super.toJson() as UnauthorizedErrorJsonResult;
  }
}

//====================================================================================================
// Forbidden error
//====================================================================================================
export interface ForbiddenErrorParams {
  message?: string;
  code?: string;
}

export interface ForbiddenErrorJsonResult extends HttpErrorBaseJsonResult {
  status: 403;
}

export class ForbiddenError extends HttpErrorBase {
  constructor(params?: ForbiddenErrorParams) {
    super({
      message: 'アクセスが禁止されています',
      code: ForbiddenError.name,
      ...params,
      status: 403,
    });
  }

  public toJson(): ForbiddenErrorJsonResult {
    return super.toJson() as ForbiddenErrorJsonResult;
  }
}

//====================================================================================================
// Not fount error
//====================================================================================================
export interface NotFoundErrorParams {
  message?: string;
  code?: string;
}

export class NotFoundError extends HttpErrorBase {
  constructor(params?: NotFoundErrorParams) {
    super({
      message: 'リソースが見つかりません',
      code: NotFoundError.name,
      ...params,
      status: 404,
    });
  }
}

//====================================================================================================
// Internal server error
//====================================================================================================
export interface InternalServerErrorParams {
  message?: string;
  code?: string;
}

export interface InternalServerErrorJsonResult extends HttpErrorBaseJsonResult {
  status: 500;
}

export class InternalServerError extends HttpErrorBase {
  constructor(params?: InternalServerErrorParams) {
    super({
      message: 'サーバーの内部でエラーが発生しました',
      code: InternalServerError.name,
      ...params,
      status: 500,
    });
  }

  public toJson(): InternalServerErrorJsonResult {
    return super.toJson() as InternalServerErrorJsonResult;
  }
}

//====================================================================================================
// Service unavailable error
//====================================================================================================
export interface ServiceUnavailableErrorParams {
  startDate?: Date;
  endDate?: Date;
  message?: string;
  code?: string;
}

export interface ServiceUnavailableErrorJsonResult
  extends HttpErrorBaseJsonResult {
  status: 503;
  startDate?: string;
  endDate?: string;
}

export class ServiceUnavailableError extends HttpErrorBase {
  startDate?: Date;
  endDate?: Date;

  constructor(params?: ServiceUnavailableErrorParams) {
    super({
      message: 'サービスが利用できません',
      code: ServiceUnavailableError.name,
      ...params,
      status: 503,
    });
  }

  public toJson(): ServiceUnavailableErrorJsonResult {
    return {
      ...super.toJson(),
      startDate: this.startDate?.toISOString(),
      endDate: this.endDate?.toISOString(),
    } as ServiceUnavailableErrorJsonResult;
  }
}
