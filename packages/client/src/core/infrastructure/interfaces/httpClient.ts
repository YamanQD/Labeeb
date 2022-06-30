// Check out this repo for inspiration:
// https://github.com/andoshin11/clean-architecture-example-vue/tree/master/src/network

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH";

export interface IRequestOptions {
    path: string;
    method?: HTTPMethod;
}

export interface IHTTPClient {
    request(options: IRequestOptions): Promise<any>;
}
