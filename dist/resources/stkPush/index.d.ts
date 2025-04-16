import { Base } from '../base';
import { STKPushRequestBody, STKPushResponse } from './types';
export declare class STKPush extends Base {
    constructor(config: {
        apiKey?: string;
        baseUrl?: string;
    });
    send(requestBody: STKPushRequestBody): Promise<STKPushResponse>;
}
