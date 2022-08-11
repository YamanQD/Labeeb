import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksService } from "../application";
import { TASKS_QUERY_KEY } from "./keys";

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (taskId: number) => {
            return tasksService.deleteTask(taskId);
        },
        {
            // The second argument is the same that the mutate function receives
            onSuccess(responseData, taskId) {
                queryClient.invalidateQueries([TASKS_QUERY_KEY]);
            },
        }
    );

    return mutation;
};
