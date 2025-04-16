// sdk/src/resources/accountBalance/index.ts

import { Base } from '../base';
import { AccountBalanceRequestBody, AccountBalanceResponse } from './types';

export class AccountBalance extends Base {
  constructor(config: { apiKey?: string; baseUrl?: string }) {
    super(config);
  }

  async query(requestBody: AccountBalanceRequestBody): Promise<AccountBalanceResponse> {
    return this.request<AccountBalanceResponse>('/mpesa/accountbalance/v2/query', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
  }
}