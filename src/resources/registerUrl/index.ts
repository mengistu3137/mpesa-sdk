// sdk/src/resources/registerUrl/index.ts

import { Base } from '../base';
import { RegisterURLRequestBody, RegisterURLResponse } from './types';

export class RegisterURL extends Base {
  constructor(config: { apiKey: string; baseUrl?: string }) {
    super(config);
  }

  async register(requestBody: RegisterURLRequestBody): Promise<RegisterURLResponse> {
    const endpointWithApiKey = `/v1/c2b-register-url/register?apikey=${this.apiKey}`;
    return this.request<RegisterURLResponse>(endpointWithApiKey, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}