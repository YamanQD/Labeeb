import { useMutation, useQueryClient } from "react-query";
import { CreateTaskDTO, tasksService } from "../application";
import { TASKS_QUERY_KEY } from "./keys";

export const useAddTask = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (newTask: CreateTaskDTO) => {
            return tasksService.createTask(newTask);
        },
        {
            // The second argument is the same that the mutate function receives
            onSuccess(responseData, newTask) {
                queryClient.invalidateQueries([TASKS_QUERY_KEY]);
            },
        }
    );

    return mutation;
};
