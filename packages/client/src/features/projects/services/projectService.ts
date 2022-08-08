import { IProjectRepository } from "../domain/IprojectRepository";
import { ProjectDTO } from "./dto";
import { ProjectsMapper } from "./mappers";

export class ProjectService {
    constructor(private projectRepository: IProjectRepository) {}

    public async getProjects(): Promise<ProjectDTO[]> {
        const response = await this.projectRepository.getProjects();
        return response.map(ProjectsMapper.projectToDTO);
    }
}
