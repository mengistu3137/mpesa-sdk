import { Base } from '../base';
import { C2BRequestBody, C2BResponse } from './types';
export declare class C2B extends Base {
    constructor(config: {
        apiKey?: string;
        baseUrl?: string;
    });
    async(requestBody: C2BRequestBody): Promise<C2BResponse>;
}
