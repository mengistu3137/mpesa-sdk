import { Base } from '../base';
import { B2CRequestBody, B2CResponse } from './types';
export declare class B2C extends Base {
    constructor(config: {
        apiKey?: string;
        baseUrl?: string;
    });
    send(requestBody: B2CRequestBody): Promise<B2CResponse>;
}
