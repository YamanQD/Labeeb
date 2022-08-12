import { useQuery } from "@tanstack/react-query";
import { projectsService } from "../application";
import { PROJECTS_QUERY_KEY } from "./keys";

interface UseGetProject {
    id: number;
    queryOptions?: Object;
}

export const useGetProject = ({ id, queryOptions = {} }: UseGetProject) => {
    const fetchProject = async () => {
        return await projectsService.getProject(id);
    };

    return useQuery([PROJECTS_QUERY_KEY, { id }], fetchProject, queryOptions);
};
