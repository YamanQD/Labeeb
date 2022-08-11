import { useQuery } from "@tanstack/react-query";
import { tasksService } from "../application";
import { TASKS_QUERY_KEY } from "./keys";

interface UseGetTaskProps {
    id: number;
    queryOptions?: Object;
}

export const useGetTask = ({ id, queryOptions = {} }: UseGetTaskProps) => {
    const fetchTask = async () => {
        return tasksService.getTask(id);
    };

    return useQuery([TASKS_QUERY_KEY, { id }], fetchTask, queryOptions);
};
