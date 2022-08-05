import { useQuery } from "react-query";
import { tasksService } from "../services";

interface UseGetTaskListsProps {
    projectId: string | undefined;
    listId: string | undefined;

    // TODO: Set a proper type for query options
    queryOptions?: Object;
}

export const useGetTaskLists = ({ projectId, listId, queryOptions = {} }: UseGetTaskListsProps) => {
    const fetchAllTaskLists = async () => {
        /**
         * ListId is present? Fetch a specific taskList
         * otherwise return all of the tasks (and lists) of a project.
         */
        if (typeof listId === "string") {
            const taskList = await tasksService.getTaskList(+listId);
            return [taskList];
        } else if (typeof projectId === "string") {
            return tasksService.getTaskListsForProject(+projectId);
        }
    };

    return useQuery(
        [
            "taskLists",
            {
                projectId,
                listId,
            },
        ],
        fetchAllTaskLists,
        queryOptions
    );
};