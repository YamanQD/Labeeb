import { HTTPClient } from "src/core/infrastructure/http/httpClient";
import { IProject } from "../domain/project";

export class ProjectRepository {
    constructor(private httpClient: HTTPClient) {}

    public async getProjects(): Promise<IProject[]> {
        const response = await this.httpClient.request<IProject[]>({
            path: "/projects",
        });

        return response;
    }
}
