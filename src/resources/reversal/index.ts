// sdk/src/resources/reversal/index.ts

import { Base } from '../base';
import { ReversalRequestBody, ReversalResponse } from './types';

export class Reversal extends Base {
  constructor(config: { apiKey?: string; baseUrl?: string }) {
    super(config);
  }

  async reverse(requestBody: ReversalRequestBody): Promise<ReversalResponse> {
    return this.request<ReversalResponse>('/mpesa/reversal/v2/request', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
  }
}