import { STKPush } from './resources/stkPush';
import { RegisterURL } from './resources/registerUrl';
import { C2B } from './resources/c2b';
import { B2C } from './resources/b2c';
import { TransactionStatus } from './resources/transactionStatus';
import { AccountBalance } from './resources/accountBalance';
import { Reversal } from './resources/reversal';
import { generateSTKPushPassword, formatTimestamp } from './utils';
export type Config = {
    consumerKey: string;
    consumerSecret: string;
    baseUrl?: string;
};
export declare class MpesaSDK {
    stkPush: STKPush;
    registerURL: RegisterURL;
    c2b: C2B;
    b2c: B2C;
    transactionStatus: TransactionStatus;
    accountBalance: AccountBalance;
    reversal: Reversal;
    generateSTKPushPassword: typeof generateSTKPushPassword;
    formatTimestamp: typeof formatTimestamp;
    private apiKey?;
    private consumerKey;
    private consumerSecret;
    private baseUrl;
    constructor(config: Config);
    getToken(): Promise<string>;
    setToken(token: string): void;
}
