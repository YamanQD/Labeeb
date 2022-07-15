import {
    APIError,
    IHTTPClient,
    IRequestOptions,
    type ErrorListener,
} from "../interfaces/IhttpClient";
import { useStore } from "../store";
export class HTTPClient implements IHTTPClient {
    private errorListeners: ErrorListener[] = [];
    private baseURL = "";

    private static instance: HTTPClient;

    private constructor() {}

    public static getInstance() {
        if (!this.instance) this.instance = new HTTPClient();
        return this.instance;
    }

    public async request<ResponseType>(options: IRequestOptions): Promise<ResponseType> {
        const { path, method = "GET", params = {}, body = undefined, headers = {} } = options;
        const requestPath = this.constructRequestPath(path, params);
        const requestHeaders = this.constructRequestHeaders(headers);

        const response = await fetch(requestPath, {
            method,
            body,
            headers: requestHeaders,
        });

        const json = await response.json();

        if (!response.ok) {
            const error: APIError = {
                message: json.message,
                status: response.status,
            };

            this.errorListeners.forEach((callback) => callback(error));
            throw error;
        }

        const parsedResponse = options.parser ? options.parser<ResponseType>(json) : json;
        return parsedResponse;
    }

    public subscribeToError(listener: ErrorListener): () => void {
        this.errorListeners.push(listener);

        // Unsubscribe function
        return () => {
            this.errorListeners = this.errorListeners.filter((func) => func != listener);
        };
    }

    private constructRequestPath(originalPath: string, params: Object): string {
        const queryParameters = this.constructQueryParameters(params);
        return `${this.baseURL}${originalPath}?${queryParameters}`;
    }

    private constructQueryParameters(params: Object): URLSearchParams {
        const parameters: Record<string, string> = {};

        for (const [key, value] of Object.entries(params)) {
            if (value == undefined || value == null) continue;
            parameters[key] = value;
        }

        return new URLSearchParams(parameters);
    }

    private constructRequestHeaders(headers: Record<string, string>): Record<string, string> {
        const user = useStore.getState().user;
        const accessToken = user?.access_token;

        return {
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
            "Content-Type": "application/json",
            ...headers,
        };
    }
}
