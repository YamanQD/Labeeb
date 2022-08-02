// Check out this repo for inspiration:

type HTTPMethod = "GET" | "POST" | "PATCH" | "DELETE";

export interface APIError {
    message: string;
    /**
     * HTTP Status
     */
    status: number;
}

export type ErrorListener = (error: APIError) => void;

export interface IRequestOptions {
    path: string;
    method?: HTTPMethod;
    params?: any;
    body?: any;
    headers?: any;

    /**
     * An optional method that parses the response provided by the client.
     * @param data
     */
    parser?<ResponseType>(data: any): Promise<ResponseType>;
}

export interface IHTTPClient {
    request<ResponseType>(options: IRequestOptions): Promise<ResponseType>;

    /**
     * When an API error happens (i.e. 4.x.x, 5.x.x), the `listener` callback gets fired.
     * @param listener The callback that gets fired
     * @returns Unsubscribe method
     */
    subscribeToError(listener: ErrorListener): () => void;
}
