import { IHTTPClient, IRequestOptions } from "../interfaces/IhttpClient";

export class HTTPClient implements IHTTPClient {
    async request<ResponseType>(options: IRequestOptions): Promise<ResponseType> {
        const { path, method = "GET", params = {} } = options;

        const nonEmptyParameters = this.filterQueryParameters(params);
        const urlParameters = new URLSearchParams(nonEmptyParameters);

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

    /**
     * Filters query parameters for values that are either null or undefined.
     * @param params 
     * @returns 
     */
    private filterQueryParameters(params: Object): Record<string, string> {
        const parameters: Record<string, string> = {};
        
        for (const [key, value] of Object.entries(params)) {
            if (value == undefined || value == null) continue;
            parameters[key] = value;
        }

        return parameters;
    }
}
