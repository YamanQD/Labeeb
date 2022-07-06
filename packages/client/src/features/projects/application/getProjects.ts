import { useQuery } from "react-query";
import { HTTPClient } from "src/core/infrastructure/http/httpClient";
import { IProject } from "../domain/project";
import { ProjectRepository } from "../infrastructure/projectRepository";
import { ProjectService } from "../services/projectService";

const httpClient = new HTTPClient();
const projectsRepository = new ProjectRepository(httpClient);
const projectsService = new ProjectService(projectsRepository);

interface UseGetProjects {
    queryOptions?: Object;
}

export const useGetProjects = ({ queryOptions = {} }: UseGetProjects = {}) => {
    const fetchProjects = async () => {
        return await projectsService.getProjects();
    };

    return useQuery<IProject[], Error>("projects", fetchProjects, queryOptions);
};
