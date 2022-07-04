import { Project } from "./project";

export interface IProjectRepository {
    /**
     * Returns the projects that are assigned to the user.
     */
    getProjects(): Promise<Project[]>;
}