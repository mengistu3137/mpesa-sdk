// sdk/src/resources/transactionStatus/index.ts

import { Base } from '../base';
import { TransactionStatusRequestBody, TransactionStatusResponse } from './types';

export class TransactionStatus extends Base {
  constructor(config: { apiKey?: string; baseUrl?: string }) {
    super(config);
  }

  async query(requestBody: TransactionStatusRequestBody): Promise<TransactionStatusResponse> {
    return this.request<TransactionStatusResponse>('/mpesa/transactionstatus/v1/query', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
  }
}