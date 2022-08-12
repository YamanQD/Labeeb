import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/lib/react-query";
import { projectsService } from "../application";
import { CreateProjectDTO } from "../types/project.dto";
import { PROJECTS_QUERY_KEY } from "./keys";

export const useAddProject = () => {
    const mutation = useMutation(
        (project: CreateProjectDTO) => {
            return projectsService.createProject(project);
        },
        {
            onSuccess() {
                queryClient.invalidateQueries([PROJECTS_QUERY_KEY]);
            },
        }
    );

    return mutation;
};
