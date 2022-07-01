// Check out this repo for inspiration:
// https://github.com/andoshin11/clean-architecture-example-vue/tree/master/src/network

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH";

export interface IRequestOptions {
    path: string;
    method?: HTTPMethod;

    /**
     * An optional method that parses the response provided by the client.
     * @param data 
     */
    parser?<ResponseType>(data: any): Promise<ResponseType>;
}

export interface IHTTPClient {
    request<ResponseType>(options: IRequestOptions): Promise<ResponseType>;
}
