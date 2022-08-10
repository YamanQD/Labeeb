import { useMutation, useQueryClient } from "react-query";

import { EditTaskDTO, tasksService } from "../application";
import { TASKS_QUERY_KEY } from "./keys";

export const useEditTask = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (editedTask: EditTaskDTO) => {
            return tasksService.editTask(editedTask.id, editedTask);
        },
        {
            // The second argument is the same that the mutate function receives
            onSuccess(responseData, editedTask) {
                queryClient.invalidateQueries([TASKS_QUERY_KEY]);
            },
        }
    );

    return mutation;
};
