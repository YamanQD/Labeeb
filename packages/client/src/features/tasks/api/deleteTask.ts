import { useMutation, useQueryClient } from "react-query";

import { tasksService } from "../application";

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (taskId: number) => {
            return tasksService.deleteTask(taskId);
        },
        {
            // The second argument is the same that the mutate function receives
            onSuccess(responseData, taskId) {
                queryClient.invalidateQueries(["taskLists"]);
            },
        }
    );

    return mutation;
};
