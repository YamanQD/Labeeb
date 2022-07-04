import { HTTPClient } from "src/core/infrastructure/http/httpClient";
import { Project } from "../domain/project";
import { ProjectsMapper } from "./mappers";

export class ProjectRepository {
    constructor(private httpClient: HTTPClient) { }

    public async getProjects(): Promise<Project[]> {
        const response = await this.httpClient.request<Project[]>({
            path: "/projects",
        });

        const mappedResponse = response.map(ProjectsMapper.dtoToProject);
        return mappedResponse;
    }
}