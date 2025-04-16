// sdk/src/resources/simulateC2B/index.ts
import { Base } from '../base';
import { C2BRequestBody, C2BResponse } from './types';

export class C2B extends Base {
  constructor(config: { apiKey?: string; baseUrl?: string }) {
    super(config);
  }

  async (requestBody: C2BRequestBody): Promise<C2BResponse> {
    return this.request<C2BResponse>('/mpesa/b2c/transaction/v1/request', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
  }
}