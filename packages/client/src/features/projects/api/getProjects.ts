import { useQuery } from "@tanstack/react-query";
import { projectsService } from "../application";
import { PROJECTS_QUERY_KEY } from "./keys";

interface UseGetProjects {
    queryOptions?: Object;
}

export const useGetProjects = ({ queryOptions = {} }: UseGetProjects = {}) => {
    const fetchProjects = async () => {
        return projectsService.getProjects();
    };

    return useQuery([PROJECTS_QUERY_KEY], fetchProjects, queryOptions);
};
