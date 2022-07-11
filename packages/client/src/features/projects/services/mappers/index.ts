import { IProject, IProjectGroup } from "../../domain/project";
import { ProjectDTO, ProjectGroupDTO } from "../dto";

export class ProjectsMapper {
    static projectToDTO(project: IProject): ProjectDTO {
        const dtoProjectGroups = project.groups.map(ProjectsMapper.projectGroupToDTO);
        project.groups = dtoProjectGroups;
        return project;
    }

    static projectGroupToDTO(projectGroup: IProjectGroup): ProjectGroupDTO {
        return projectGroup;
    }
}
