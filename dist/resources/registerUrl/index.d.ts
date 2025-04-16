import { Base } from '../base';
import { RegisterURLRequestBody, RegisterURLResponse } from './types';
export declare class RegisterURL extends Base {
    constructor(config: {
        apiKey: string;
        baseUrl?: string;
    });
    register(requestBody: RegisterURLRequestBody): Promise<RegisterURLResponse>;
}
