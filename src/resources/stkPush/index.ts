import { Base } from '../base';
import { STKPushRequestBody, STKPushResponse } from './types';
export class STKPush extends Base {
    constructor(config: { apiKey?: string; baseUrl?: string }) {
        super(config)
    }
    async send(requestBody: STKPushRequestBody): Promise<STKPushResponse> {
        return this.request<STKPushResponse>( '/mpesa/stkpush/v3/processrequest', {
            method: 'POST',
            body: JSON.stringify(requestBody),
        });
    }
}