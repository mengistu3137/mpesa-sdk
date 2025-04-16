type Config = {
    apiKey?: string;
    baseUrl?: string;
};
export declare abstract class Base {
    protected apiKey?: string;
    protected baseUrl: string;
    constructor(config: Config);
    updateApiKey(apiKey: string): void;
    protected request<T>(endPoint: string, options?: RequestInit): Promise<T>;
}
export {};
