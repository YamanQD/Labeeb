import { IProject } from "../types/project";
import { ProjectDTO } from "../types/project.dto";

export class ProjectsMapper {
    static projectToDTO(project: IProject): ProjectDTO {
        return project;
    }
}
