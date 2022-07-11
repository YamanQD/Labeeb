import { useMutation, useQueryClient } from "react-query";
import { CreateTaskDTO, tasksService } from "../services";

export const useAddTask = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (newTask: CreateTaskDTO) => {
            return tasksService.createTask(newTask);
        },
        {
            // The second argument is the same that the mutate function receives
            onSuccess(responseData, newTask) {
                /**
                 * The user can add a task from all pages inside the '/tasks' route,
                 * so it's necessary to invalidate all 'taskGroups' queries.
                 */
                queryClient.invalidateQueries(["taskGroups"]);
            },
        }
    );

    return mutation;
};
