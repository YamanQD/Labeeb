import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/lib/react-query";
import { projectsService } from "../application";
import { PROJECTS_QUERY_KEY } from "./keys";

export const useDeleteProject = () => {
    const mutation = useMutation(
        (id: number) => {
            return projectsService.deleteProject(id);
        },
        {
            onSuccess() {
                queryClient.invalidateQueries([PROJECTS_QUERY_KEY]);
            },
        }
    );

    return mutation;
};
