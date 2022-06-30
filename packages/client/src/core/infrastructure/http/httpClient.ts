import { IHTTPClient, IRequestOptions } from "../interfaces/httpClient";

export class HTTPClient implements IHTTPClient {
    async request(options: IRequestOptions): Promise<any> {
        const { path, method = "GET" } = options;

        return await fetch(path, {
            method,
        });
    }
}
