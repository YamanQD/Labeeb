import { IHTTPClient, IRequestOptions } from "../interfaces/IhttpClient";

export class HTTPClient implements IHTTPClient {
    constructor(private baseURL: string = "") {}

    async request<ResponseType>(options: IRequestOptions): Promise<ResponseType> {
        const { path, method = "GET", params = {}, body = undefined, headers = {} } = options;

        const requestPath = this.constructRequestPath(path, params);
        const requestHeaders = this.constructRequestHeaders(headers);

        const response = await fetch(requestPath, {
            method,
            body,
            headers: requestHeaders,
        });

        const json = await response.json();
        const parsedResponse = options.parser ? options.parser<ResponseType>(json) : json;

        // TODO: Handle errors
        return parsedResponse;
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
        const accessToken = localStorage.getItem('token');
        if (accessToken) return {
            'Authorization': `Bearer ${accessToken}`,
            ...headers
        };

        return headers;
    }
}
