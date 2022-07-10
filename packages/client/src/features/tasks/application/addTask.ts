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
                queryClient.invalidateQueries(["taskGroups", newTask.projectId, newTask.groupId]);
            },
        }
    );

    return mutation;
};
