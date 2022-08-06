import { IHTTPClient } from "src/core/infrastructure/interfaces/IHTTPClient";
import { IProject } from "../domain/project";

export class ProjectRepository {
    constructor(private httpClient: IHTTPClient) {}

    public async getProjects(): Promise<IProject[]> {
        const response = await this.httpClient.request<IProject[]>({
            path: "/projects",
        });

        return response;
    }
}
