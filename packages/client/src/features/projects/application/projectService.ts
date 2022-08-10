import { IProjectRepository } from "./IprojectRepository";
import { ProjectDTO } from "../types/project.dto";
import { ProjectsMapper } from "./projectMapper";

export class ProjectService {
    constructor(private projectRepository: IProjectRepository) {}

    public async getProjects(): Promise<ProjectDTO[]> {
        const response = await this.projectRepository.getProjects();
        return response.map(ProjectsMapper.projectToDTO);
    }
}
