import { Base } from '../base';
import { AccountBalanceRequestBody, AccountBalanceResponse } from './types';
export declare class AccountBalance extends Base {
    constructor(config: {
        apiKey?: string;
        baseUrl?: string;
    });
    query(requestBody: AccountBalanceRequestBody): Promise<AccountBalanceResponse>;
}
