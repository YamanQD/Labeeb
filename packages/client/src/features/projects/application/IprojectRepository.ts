import { IProject } from "../types/project";
import { CreateProjectDTO, EditProjectDTO } from "../types/project.dto";

export interface IProjectRepository {
    /**
     * Returns the projects that are assigned to the user.
     */
    getProjects(): Promise<IProject[]>;
    deleteProject(id: number): Promise<void>;
    getProject(id: number): Promise<IProject>;
    createProject(project: CreateProjectDTO): Promise<void>;
    editProject(project: EditProjectDTO): Promise<void>;
}
