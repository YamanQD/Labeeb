import { useStore } from "../store";

export class RequestHelper {
    constructor(private baseURL: string) {}

    public async responseToJSON(response: Response) {
        let json;
        try {
            json = await response.json();
        } catch (e) {
            json = {};
        }

        return json;
    }

    public getRequestHeaders(headers: Record<string, string>): Record<string, string> {
        const user = useStore.getState().userProfile;
        const accessToken = user?.access_token;

        return {
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
            "Content-Type": "application/json",
            ...headers,
        };
    }

    public getRequestPath(originalPath: string, params: Object): string {
        const queryParameters = this.getQueryParameters(params);
        return `${this.baseURL}${originalPath}?${queryParameters}`;
    }

    private getQueryParameters(params: Object): URLSearchParams {
        const parameters: Record<string, string> = {};

        for (const [key, value] of Object.entries(params)) {
            if (value == undefined || value == null) continue;
            parameters[key] = value;
        }

        return new URLSearchParams(parameters);
    }
}
