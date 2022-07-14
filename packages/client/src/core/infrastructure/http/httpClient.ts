import { IHTTPClient, IRequestOptions } from "../interfaces/IhttpClient";
import { type APIError } from "./types";
import { getErrorMessageFromHTTPStatus } from "./utils";

type ErrorListener = (error: APIError) => void;

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

        if (!response.ok) {
            const error: APIError = {
                message: getErrorMessageFromHTTPStatus(response.status),
                status: response.status,
            };

            this.errorListeners.forEach((callback) => callback(error));

            // Throw all errors except for authorization ones,
            // Because there is a React component that will handle them.
            if (response.status != 401) throw error;
        }

        const json = await response.json();
        const parsedResponse = options.parser ? options.parser<ResponseType>(json) : json;
        return parsedResponse;
    }

    public subscribeToError(listener: ErrorListener): () => void {
        this.errorListeners.push(listener);

        // Unsubscribe function
        return () => {
            this.errorListeners = this.errorListeners.filter((func) => func != listener);
        }
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
        const accessToken = localStorage.getItem("token");
        if (accessToken)
            return {
                Authorization: `Bearer ${accessToken}`,
                ...headers,
            };

        return headers;
    }
}
