import { useMutation, useQueryClient } from "react-query";

import { EditTaskDTO, tasksService } from "../services";

export const useEditTask = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (editedTask: EditTaskDTO) => {
            return tasksService.editTask(editedTask.id, editedTask);
        },
        {
            // The second argument is the same that the mutate function receives
            onSuccess(responseData, editedTask) {
                queryClient.invalidateQueries(["taskLists"]);
            },
        }
    );

    return mutation;
};
