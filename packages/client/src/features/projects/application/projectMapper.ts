import { IProject, IProjectList } from "../types/project";
import { ProjectDTO, ProjectListDTO } from "../types/project.dto";

export class ProjectsMapper {
    static projectToDTO(project: IProject): ProjectDTO {
        project.lists = project.lists.map(ProjectsMapper.projectListToDTO);
        return project;
    }

    static projectListToDTO(projectList: IProjectList): ProjectListDTO {
        return projectList;
    }
}
