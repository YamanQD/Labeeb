import { IProject } from "../types/project";

export interface IProjectRepository {
    /**
     * Returns the projects that are assigned to the user.
     */
    getProjects(): Promise<IProject[]>;
}
