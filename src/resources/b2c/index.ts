// sdk/src/resources/b2c/index.ts

import { Base } from '../base';
import { B2CRequestBody, B2CResponse } from './types';

export class B2C extends Base {
  constructor(config: { apiKey?: string; baseUrl?: string }) {
    super(config);
  }

  async send(requestBody: B2CRequestBody): Promise<B2CResponse> {
    return this.request<B2CResponse>('/mpesa/b2c/v2/paymentrequest', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
  }
}