// sdk/src/index.ts

import { STKPush } from './resources/stkPush';
import { RegisterURL } from './resources/registerUrl';
import { C2B } from './resources/c2b';
import { B2C } from './resources/b2c';
import { TransactionStatus } from './resources/transactionStatus';
import { AccountBalance } from './resources/accountBalance';
import { Reversal } from './resources/reversal';
import { generateSTKPushPassword, formatTimestamp } from './utils';

import fetch from 'isomorphic-unfetch'; // Import fetch

export type Config = {
  consumerKey: string; // Only require consumer key and secret initially
  consumerSecret: string;
  baseUrl?: string;
};

// Define a config type for the resource classes that includes optional apiKey
type ResourceConfig = {
  apiKey: string;
  baseUrl?: string;
};

export class MpesaSDK {
  stkPush: STKPush;
  registerURL: RegisterURL;
  c2b: C2B;
  b2c: B2C;
  transactionStatus: TransactionStatus;
  accountBalance: AccountBalance;
  reversal: Reversal;
  generateSTKPushPassword: typeof generateSTKPushPassword;
  formatTimestamp: typeof formatTimestamp;

  private apiKey?: string; // apiKey is initially undefined
  private consumerKey: string;
  private consumerSecret: string;
  private baseUrl: string;

  constructor(config: Config) { // Use the simplified Config type
    if (!config.consumerKey || !config.consumerSecret) {
      throw new Error('Consumer Key and Consumer Secret are required.');
    }
    this.consumerKey = config.consumerKey;
    this.consumerSecret = config.consumerSecret;
    this.baseUrl = config.baseUrl || 'https://apisandbox.safaricom.et';

    const resourceConfig: ResourceConfig = { baseUrl: this.baseUrl, apiKey: this.apiKey || '' }; // Initialize with baseUrl and default apiKey

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

  async getToken(): Promise<string> {
    const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
    const response: Response = await fetch(`${this.baseUrl}/v1/token/generate?grant_type=client_credentials`, {
      headers: {
        'Authorization': `Basic ${auth}`,
      },
    });

    if (!response.ok) {
      const errorBody = await response.json(); // Capture the JSON error response
      throw new Error(`Failed to obtain access token: ${response.status} - ${JSON.stringify(errorBody)}`);
    }

    const data = await response.json();
    this.apiKey = data.access_token; // Store the new token
    // Update the resources with the new token.
      if (this.apiKey) {
    this.stkPush.updateApiKey(this.apiKey);
    this.registerURL.updateApiKey(this.apiKey);
    this.c2b.updateApiKey(this.apiKey);
    this.transactionStatus.updateApiKey(this.apiKey);
    this.accountBalance.updateApiKey(this.apiKey);
    this.reversal.updateApiKey(this.apiKey);
    this.b2c.updateApiKey(this.apiKey);
    } else {
      throw new Error('API key is undefined. Please set the API key before updating.');
    }
    
    return this.apiKey;
  }

  setToken(token: string) {
      this.apiKey = token;
      this.stkPush.updateApiKey(this.apiKey);
      this.registerURL.updateApiKey(this.apiKey);
      this.c2b.updateApiKey(this.apiKey);
      this.b2c.updateApiKey(this.apiKey);
      this.transactionStatus.updateApiKey(this.apiKey);
      this.accountBalance.updateApiKey(this.apiKey);
      this.reversal.updateApiKey(this.apiKey);
  }
}