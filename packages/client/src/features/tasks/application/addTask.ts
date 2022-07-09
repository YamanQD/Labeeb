import { useMutation, useQueryClient } from "react-query";
import { CreateTaskDTO } from "../services";

export const useAddTask = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (newTask: CreateTaskDTO) => {
            // return tasksService.createTask(newTask);
            return Promise.resolve(newTask);
        },
        {
            // The second argument is the same that the mutate function receives
            onSuccess(data, newTask) {
                // ONLY FOR TESTING PURPOSES
                queryClient.setQueryData(
                    ["taskGroups", newTask.projectId, newTask.groupId],
                    (oldData: any) => {
                        if (oldData) {
                            oldData[0].taskLists[0].tasks.push(data);
                            return oldData;
                        }
                    }
                );
            },
        }
    );

    return mutation;
};
