import { IProjectRepository } from "../domain/IprojectRepository";
import { Project } from "../domain/project";

export class ProjectsService {
    constructor(private projectsRepository: IProjectRepository) { }

    public async getProjects(): Promise<Project[]> {
        return await this.projectsRepository.getProjects();
    }
}