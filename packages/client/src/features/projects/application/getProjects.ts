 import { useQuery } from "react-query";
import { HTTPClient } from "src/core/infrastructure/http/httpClient";
import { Project } from "../domain/project";
import { ProjectRepository } from "../infrastructure/projectRepository";
import { ProjectsService } from "../services/projectsService";

const httpClient = new HTTPClient();
const projectsRepository = new ProjectRepository(httpClient)
const projectsService = new ProjectsService(projectsRepository);

interface UseGetProjects {
    queryOptions?: Object;
}

export const useGetProjects = ({ queryOptions = {} }: UseGetProjects = {}) => {
    const fetchProjects = async () => {
        return await projectsService.getProjects();
    }

    return useQuery<Project[], Error>("projects", fetchProjects, queryOptions);
}