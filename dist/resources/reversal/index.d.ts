import { Base } from '../base';
import { ReversalRequestBody, ReversalResponse } from './types';
export declare class Reversal extends Base {
    constructor(config: {
        apiKey?: string;
        baseUrl?: string;
    });
    reverse(requestBody: ReversalRequestBody): Promise<ReversalResponse>;
}
