import { IProjectRepository } from "../domain/IprojectRepository";
import { Project } from "../domain/project";

export class ProjectService {
    constructor(private projectRepository: IProjectRepository) {}

    public async getProjects(): Promise<Project[]> {
        return await this.projectRepository.getProjects();
    }
}
