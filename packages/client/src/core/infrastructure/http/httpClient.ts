import {
    APIError,
    IHTTPClient,
    IRequestOptions,
    type ErrorListener,
} from "../interfaces/IhttpClient";
import { RequestHelper } from "./requestHelper";
export class HTTPClient implements IHTTPClient {
    private errorListeners: ErrorListener[] = [];
    private baseURL = "http://localhost:4000";

    private requestHelper = new RequestHelper(this.baseURL);
    private static instance: HTTPClient;

    private constructor() {}

    public static getInstance() {
        if (!this.instance) this.instance = new HTTPClient();
        return this.instance;
    }

    public async request<ResponseType>(options: IRequestOptions): Promise<ResponseType> {
        const { path, method = "GET", params = {}, body = undefined, headers = {} } = options;

        const requestPath = this.requestHelper.getRequestPath(path, params);
        const requestHeaders = this.requestHelper.getRequestHeaders(headers);

        const response = await fetch(requestPath, {
            method,
            body: JSON.stringify(body),
            headers: requestHeaders,
        });

        const json = await this.requestHelper.responseToJSON(response);
      

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
}
