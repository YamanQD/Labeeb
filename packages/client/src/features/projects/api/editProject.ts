import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/lib/react-query";
import { projectsService } from "../application";
import { EditProjectDTO } from "../types/project.dto";
import { PROJECTS_QUERY_KEY } from "./keys";

export const useEditProject = () => {
    const mutation = useMutation(
        (project: EditProjectDTO) => {
            return projectsService.editProject(project);
        },
        {
            onSuccess() {
                queryClient.invalidateQueries([PROJECTS_QUERY_KEY]);
            },
        }
    );

    return mutation;
};
