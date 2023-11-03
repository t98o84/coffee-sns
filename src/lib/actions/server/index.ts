import {
  FailureResponse,
  SuccessResponse,
  makeFailureResponse,
} from '@/lib/actions/shared';
import {
  HttpErrorBase,
  HttpErrorBaseJsonResult,
  InternalServerError,
  InternalServerErrorJsonResult,
  ValidationError,
} from '@/lib/errors';
import { logger } from '@/lib/logs/server';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { ZodError } from 'zod';

export async function handleAction<
  S extends SuccessResponse<unknown>,
  F extends FailureResponse,
  T extends () => Promise<S | F> = () => Promise<S | F>,
>(
  action: T,
): Promise<
  | S
  | F
  | FailureResponse<InternalServerErrorJsonResult | HttpErrorBaseJsonResult>
> {
  try {
    return await action();
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof ZodError) {
      return makeFailureResponse(ValidationError.fromZodError(error).toJson());
    }

    if (error instanceof HttpErrorBase) {
      return makeFailureResponse(error.toJson());
    }

    logger.error('ServerActionError', error);

    return makeFailureResponse(new InternalServerError().toJson());
  }
}
