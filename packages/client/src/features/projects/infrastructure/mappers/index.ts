import { Project, ProjectGroup } from "../../domain/project";
import { ProjectDTO, ProjectGroupDTO } from "../dto";

export class ProjectsMapper {
    static dtoToProject(dto: ProjectDTO): Project {
        return dto;
    }

    static dtoToProjectGroup(dto: ProjectGroupDTO): ProjectGroup {
        return dto;
    }
}