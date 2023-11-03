export type SuccessResponse<T> = { success: true; data?: T };

export type FailureResponse<
  T extends FailureResponseDataBase = FailureResponseDataBase,
> = {
  failure: true;
  data: T;
};

export type FailureResponseDataBase = {
  message: string;
};

export function makeSuccessResponse<T>(data?: T): SuccessResponse<T> {
  return {
    success: true,
    data,
  };
}

export function makeFailureResponse<T extends { message: string }>(
  data: T,
): FailureResponse<T> {
  return {
    failure: true,
    data,
  };
}

export function isSuccessResponse<T extends SuccessResponse<unknown>>(
  result: unknown,
): result is T {
  return (
    result !== null &&
    result !== undefined &&
    typeof result === 'object' &&
    'success' in result &&
    result.success === true
  );
}

export function isFailureResponse<T extends FailureResponse>(
  result: unknown,
): result is T {
  return (
    result !== null &&
    result !== undefined &&
    typeof result === 'object' &&
    'failure' in result &&
    result.failure === true &&
    'data' in result &&
    result.data !== null &&
    result.data !== undefined &&
    typeof result.data === 'object' &&
    'message' in result.data &&
    typeof result.data.message === 'string'
  );
}
