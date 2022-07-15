import { useQuery } from "react-query";
import { tasksService } from "../services";

interface UseGetTaskListsProps {
    projectId: number | null;
    listId: number | null;

    // TODO: Set a proper type for query options
    queryOptions?: Object;
}

export const useGetTaskLists = ({ projectId, listId, queryOptions = {} }: UseGetTaskListsProps) => {
    const fetchAllTaskLists = async () => {
        /** 
         * When listId == null, we need all the lists for a given project
         * Otherwise we need a specific list.
         * 
         * And since the frontend expects an array, because "useGetTaskLISTSSSSS"
         * we return an array of one item in the second branch.
         **/ 
        if (listId == null && typeof projectId == "number") {
            return tasksService.getTaskListsForProject(projectId);
        } else if (projectId == null && typeof listId == "number") {
            const taskList = await tasksService.getTaskList(listId);
            return [taskList];
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
