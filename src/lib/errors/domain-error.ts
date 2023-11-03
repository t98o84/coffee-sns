import { ErrorBase } from '@/lib/errors/error-base';

export interface DomainErrorParams {
  message: string;
  code?: string;
}

export class DomainError extends ErrorBase {
  constructor(params: DomainErrorParams) {
    super({ code: 'DOMAIN_ERROR', ...params });
  }
}
