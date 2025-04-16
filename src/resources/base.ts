// sdk/src/resources/base.ts

import fetch from 'isomorphic-unfetch';

type Config = {
    apiKey?: string;
    baseUrl?: string;
};

export abstract class Base {
     protected apiKey?: string;
    protected baseUrl: string;
    constructor(config: Config) {
        this.apiKey = config.apiKey;
        this.baseUrl = config.baseUrl || 'https://apisandbox.safaricom.et';
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
        options?:RequestInit
    ): Promise<T>{
        const url = `${this.baseUrl}${endPoint}`;
        const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        };
        if (this.apiKey) {
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
                }catch (e) {

                  errorMessage += ` - ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }
             if (response.status === 204) {
        return undefined as T;
            }
             return (await response.json()) as T;
        }
        catch (error: any) {
      throw new Error(`Request to ${url} failed: ${error.message}`);
    }
    }
}