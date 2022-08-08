import { useQuery } from "react-query";

import { tasksService } from "../services";

interface UseGetTaskProps {
    id: number;
    queryOptions?: Object;
}

export const useGetTask = ({ id, queryOptions = {} }: UseGetTaskProps) => {
    const fetchTask = async () => {
        return tasksService.getTask(id);
    };

    return useQuery(["tasks", id], fetchTask, queryOptions);
};
