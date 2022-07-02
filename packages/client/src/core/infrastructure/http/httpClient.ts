import { IHTTPClient, IRequestOptions } from "../interfaces/IhttpClient";

export class HTTPClient implements IHTTPClient {
    async request<ResponseType>(options: IRequestOptions): Promise<ResponseType> {
        const { path, method = "GET", params = {} } = options;

        const urlParameters = new URLSearchParams(params);
        const requestPath = `${path}?${urlParameters}`;

        const response = await fetch(requestPath, {
            method,
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
}
