import { CreateProjectDTO, EditProjectDTO, ProjectDTO } from "../types/project.dto";
import { IProjectRepository } from "./IprojectRepository";
import { ProjectsMapper } from "./projectMapper";

export class ProjectService {
    constructor(private projectRepository: IProjectRepository) {}

    public async getProjects(): Promise<ProjectDTO[]> {
        const response = await this.projectRepository.getProjects();
        return response.map(ProjectsMapper.projectToDTO);
    }

    public async deleteProject(id: number) {
        return this.projectRepository.deleteProject(id);
    }

    public async getProject(id: number): Promise<ProjectDTO> {
        const project = await this.projectRepository.getProject(id);
        return ProjectsMapper.projectToDTO(project);
    }

    public async editProject(project: EditProjectDTO) {
        return this.projectRepository.editProject(project);
    }

    public async createProject(project: CreateProjectDTO) {
        return this.projectRepository.createProject(project);
    }
}
