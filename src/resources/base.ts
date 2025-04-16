// sdk/src/resources/base.ts

import fetch from 'isomorphic-unfetch';
import { MpesaSDK } from '../index'

type Config = {
    apiKey?: string;
    baseUrl?: string;
    mpesaSDK?: MpesaSDK; // Add a reference to the MpesaSDK instance
};

export abstract class Base {
    protected apiKey?: string;
    protected baseUrl: string;
    protected mpesaSDK?: MpesaSDK; // Store the MpesaSDK instance

    constructor(config: Config) {
        this.apiKey = config.apiKey;
        this.baseUrl = config.baseUrl || 'https://apisandbox.safaricom.et';
        this.mpesaSDK = config.mpesaSDK; // Receive the MpesaSDK instance
    }

    /**
     * Updates the API key used for subsequent requests.
     * @param apiKey The new API key (access token).
     */
    updateApiKey(apiKey: string) {
        this.apiKey = apiKey;
    }

    protected async request<T>(
        endPoint: string,
        options?: RequestInit
    ): Promise<T> {
        const url = `${this.baseUrl}${endPoint}`;
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        // Use the getToken method from the MpesaSDK instance
        if (this.mpesaSDK && this.mpesaSDK.getToken) {
            const token = await this.mpesaSDK.getToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            } else {
                throw new Error('Access token is not available.');
            }
        } else if (this.apiKey) {
            // Fallback if mpesaSDK is not available (shouldn't happen with our design)
            headers['Authorization'] = `Bearer ${this.apiKey}`;
        }

        const config: RequestInit = {
            ...options,
            headers
        };

        try {
            const response: Response = await fetch(url, config);
            if (!response.ok) {
                let errorMessage = `HTTP error! status: ${response.status}`;
                try {
                    const errorBody = await response.json();
                    errorMessage += ` - ${JSON.stringify(errorBody)}`;
                } catch (e) {
                    errorMessage += ` - ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }
            if (response.status === 204) {
                return undefined as T;
            }
            return (await response.json()) as T;
        } catch (error: any) {
            throw new Error(`Request to ${url} failed: ${error.message}`);
        }
    }
}