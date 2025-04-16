// sdk/src/index.ts

import { STKPush } from './resources/stkPush';
import { RegisterURL } from './resources/registerUrl';
import { C2B } from './resources/c2b';
import { B2C } from './resources/b2c';
import { TransactionStatus } from './resources/transactionStatus';
import { AccountBalance } from './resources/accountBalance';
import { Reversal } from './resources/reversal';
import { generateSTKPushPassword, formatTimestamp } from './utils';
import { Base } from './resources/base'; // Import Base to access the request method

import fetch from 'isomorphic-unfetch';

export type Config = {
    consumerKey: string;
    consumerSecret: string;
    baseUrl?: string;
};

type ResourceConfig = {
    mpesaSDK: MpesaSDK;
    apiKey: string;
    baseUrl?: string;
};

export class MpesaSDK {
    stkPush!: STKPush;
    registerURL!: RegisterURL;
    c2b!: C2B;
    b2c!: B2C;
    transactionStatus!: TransactionStatus;
    accountBalance!: AccountBalance;
    reversal!: Reversal;
    generateSTKPushPassword!: typeof generateSTKPushPassword;
    formatTimestamp!: typeof formatTimestamp;

    private apiKey?: string;
    private consumerKey: string;
    private consumerSecret: string;
    private baseUrl: string;
    private expiryTime: number = 0; // Timestamp when the token expires
    private isRefreshing: boolean = false; // Flag to prevent concurrent refreshes
    private refreshPromise: Promise<string | undefined> | null = null;

    constructor(config: Config) {
        if (!config.consumerKey || !config.consumerSecret) {
            throw new Error('Consumer Key and Consumer Secret are required.');
        }
        this.consumerKey = config.consumerKey;
        this.consumerSecret = config.consumerSecret;
        this.baseUrl = config.baseUrl || 'https://apisandbox.safaricom.et';

        this.initializeResources(''); // Initialize with empty apiKey initially
        this.generateInitialToken();
    }

    private initializeResources(apiKey: string) {
        const resourceConfig: ResourceConfig = { baseUrl: this.baseUrl, apiKey ,mpesaSDK: this};
        this.stkPush = new STKPush(resourceConfig);
        this.registerURL = new RegisterURL(resourceConfig);
        this.c2b = new C2B(resourceConfig);
        this.b2c = new B2C(resourceConfig);
        this.transactionStatus = new TransactionStatus(resourceConfig);
        this.accountBalance = new AccountBalance(resourceConfig);
        this.reversal = new Reversal(resourceConfig);
        this.generateSTKPushPassword = generateSTKPushPassword;
        this.formatTimestamp = formatTimestamp;
    }

    private async generateInitialToken(): Promise<void> {
        try {
            const tokenData = await this.fetchToken();
            this.apiKey = tokenData.access_token;
            this.expiryTime = Date.now() + (tokenData.expires_in * 1000);
            this.initializeResources(this.apiKey);
        } catch (error) {
            console.error('Error generating initial access token:', error);
            throw new Error('Failed to generate initial access token.');
        }
    }

    private async refreshToken(): Promise<string | undefined> {
        if (this.isRefreshing) {
            return this.refreshPromise ?? undefined;
        }
        this.isRefreshing = true;
        this.refreshPromise = this.fetchToken().then(tokenData => {
            this.apiKey = tokenData.access_token;
            this.expiryTime = Date.now() + (tokenData.expires_in * 1000);
            this.initializeResources(this.apiKey);
            this.isRefreshing = false;
            this.refreshPromise = null;
            return this.apiKey;
        }).catch(error => {
            console.error('Error refreshing token:', error);
            this.isRefreshing = false;
            this.refreshPromise = null;
            throw error;
        });
        return this.refreshPromise;
    }

    private async fetchToken(): Promise<{ access_token: string; expires_in: number }> {
        const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
        const response: Response = await fetch(`${this.baseUrl}/v1/token/generate?grant_type=client_credentials`, {
            headers: {
                'Authorization': `Basic ${auth}`,
            },
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(`Failed to obtain access token: ${response.status} - ${JSON.stringify(errorBody)}`);
        }

        return await response.json();
    }

    async getToken(): Promise<string | undefined> {
        if (!this.apiKey || Date.now() >= this.expiryTime - (5 * 60 * 1000)) { // Refresh if no token or expiring in 5 minutes
            return this.refreshToken();
        }
        return this.apiKey;
    }

    setToken(token: string) {
        this.apiKey = token;
        this.expiryTime = Date.now() + (60 * 60 * 1000); // Assume 1-hour validity if manually set
        this.initializeResources(this.apiKey);
    }
}

// Extend the Base class to implement token refresh before requests
(Base.prototype as any).request = async function (endpoint: string, options: any) {
    const sdkInstance: MpesaSDK = (this as any).mpesaSDK; // Access the MpesaSDK instance

    if (sdkInstance && sdkInstance.getToken) {
        const token = await sdkInstance.getToken();
        if (token) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
            };
        }
    }

    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, options);

    if (!response.ok) {
        let errorBody;
        try {
            errorBody = await response.json();
        } catch (e) {
            errorBody = { message: `Failed to parse error response: ${response.status}` };
        }
        throw new Error(`Request to ${url} failed: HTTP error! status: ${response.status} - ${JSON.stringify(errorBody)}`);
    }

    return await response.json();
};


