import { useQuery } from "@tanstack/react-query";
import { projectsService } from "../application";


interface UseGetProjects {
    queryOptions?: Object;
}

export const useGetProjects = ({ queryOptions = {} }: UseGetProjects = {}) => {
    const fetchProjects = async () => {
        return await projectsService.getProjects();
    };

    return useQuery(["projects"], fetchProjects, queryOptions);
};
