import { useQuery } from "react-query";
import { tasksService } from "../services";

interface UseGetTaskListsProps {
    projectId: number | undefined;
    listId: number | undefined;

    // TODO: Set a proper type for query options
    queryOptions?: Object;
}

export const useGetTaskLists = ({ projectId, listId, queryOptions = {} }: UseGetTaskListsProps) => {
    const fetchAllTaskLists = async () => {
        return tasksService.getTaskListsForProject({
            projectId,
            listId,
        });
    };

    return useQuery(["taskLists", projectId, listId], fetchAllTaskLists, queryOptions);
};
