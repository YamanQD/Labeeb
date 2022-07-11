import { IHTTPClient, IRequestOptions } from "../interfaces/IhttpClient";

export class HTTPClient implements IHTTPClient {
    async request<ResponseType>(options: IRequestOptions): Promise<ResponseType> {
        const { path, method = "GET", params = {}, body = undefined, headers = {} } = options;

        const requestPath = this.constructRequestPath(path, params);

        const response = await fetch(requestPath, {
            method,
            body,
            headers,
        });

        const parsedResponse = options.parser
            ? options.parser<ResponseType>(response)
            : await this.parser<ResponseType>(response);

        // TODO: Handle errors
        return parsedResponse;
    }

    private async parser<ResponseType>(data: Response): Promise<ResponseType> {
        return await data.json();
    }

    private constructRequestPath(originalPath: string, params: Object): string {
        const queryParameters = this.constructQueryParameters(params);
        return `${originalPath}?${queryParameters}`;
    }

    private constructQueryParameters(params: Object): URLSearchParams {
        const parameters: Record<string, string> = {};

        for (const [key, value] of Object.entries(params)) {
            if (value == undefined || value == null) continue;
            parameters[key] = value;
        }

        return new URLSearchParams(parameters);
    }
}
