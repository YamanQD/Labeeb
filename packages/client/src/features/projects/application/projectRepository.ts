import { IHTTPClient } from "src/lib/http/IhttpClient";

import { IProject } from "../types/project";

export class ProjectRepository {
    constructor(private httpClient: IHTTPClient) {}

    public async getProjects(): Promise<IProject[]> {
        const response = await this.httpClient.request<IProject[]>({
            path: "/projects",
        });

        return response;
    }
}
