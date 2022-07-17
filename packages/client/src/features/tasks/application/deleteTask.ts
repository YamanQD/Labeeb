import { useMutation, useQueryClient } from "react-query";
import { tasksService } from "../services";
export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (taskId: number) => {
            return tasksService.deleteTask(taskId);
        },
        {
            // The second argument is the same that the mutate function receives
            onSuccess(responseData, newTask) {
                /**
                 * The user can add a task from all pages inside the '/tasks' route,
                 * so it's necessary to invalidate all 'taskLists' queries.
                 */
                queryClient.invalidateQueries(["taskLists"]);
            },
        }
    );

    return mutation;
};
