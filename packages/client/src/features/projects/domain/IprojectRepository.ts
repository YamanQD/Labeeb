import { IProject } from "./project";

export interface IProjectRepository {
    /**
     * Returns the projects that are assigned to the user.
     */
    getProjects(): Promise<IProject[]>;
}
