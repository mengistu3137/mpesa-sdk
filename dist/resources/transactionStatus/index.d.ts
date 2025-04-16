import { Base } from '../base';
import { TransactionStatusRequestBody, TransactionStatusResponse } from './types';
export declare class TransactionStatus extends Base {
    constructor(config: {
        apiKey?: string;
        baseUrl?: string;
    });
    query(requestBody: TransactionStatusRequestBody): Promise<TransactionStatusResponse>;
}
