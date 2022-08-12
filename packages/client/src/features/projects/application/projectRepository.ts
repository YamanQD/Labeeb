import { IHTTPClient } from "src/lib/http/IhttpClient";
import { IProject } from "../types/project";
import { CreateProjectDTO, EditProjectDTO } from "../types/project.dto";
import { IProjectRepository } from "./IprojectRepository";

export class ProjectRepository implements IProjectRepository {
    constructor(private httpClient: IHTTPClient) {}

    public async editProject(project: EditProjectDTO): Promise<void> {
        await this.httpClient.request<void>({
            path: `/projects/${project.id}`,
            method: "PATCH",
            body: project,
        });
    }

    public async deleteProject(id: number): Promise<void> {
        await this.httpClient.request<void>({
            path: `/projects/${id}`,
            method: "DELETE",
        });
    }
    public async getProject(id: number): Promise<IProject> {
        const response = await this.httpClient.request<IProject>({
            path: `/projects/${id}`,
            method: "GET",
        });

        return response;
    }
    public async createProject(project: CreateProjectDTO): Promise<void> {
        await this.httpClient.request<void>({
            path: "/projects",
            body: project,
            method: "POST",
        });
    }

    public async getProjects(): Promise<IProject[]> {
        const response = await this.httpClient.request<IProject[]>({
            path: "/projects",
        });

        return response;
    }
}
