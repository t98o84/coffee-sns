import { makePipelineWithNextFunc } from '@/lib/pipelines';
import { NextMiddlewareResult } from 'next/dist/server/web/types';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export type MiddlewareResult = NextMiddlewareResult;

export interface MiddlewareArgs {
  req: NextRequest;
  res: NextResponse;
}

export type Middleware = (
  args: MiddlewareArgs,
  next: NextMiddleware,
) => Promise<MiddlewareResult>;

export type NextMiddleware = (
  args: MiddlewareArgs,
) => Promise<MiddlewareResult>;

export type MiddlewarePipeline = (
  args: MiddlewareArgs,
) => Promise<MiddlewareResult>;

export function makeMiddlewarePipeline(
  middlewares: Middleware[],
): MiddlewarePipeline {
  return makePipelineWithNextFunc<MiddlewareArgs, Promise<MiddlewareResult>>(
    middlewares,
    async () => {},
  );
}
