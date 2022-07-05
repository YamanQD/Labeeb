import { useQuery } from "react-query";
import { tasksService } from "../services";

interface UseGetTaskGroups {
    projectId: number | undefined;
    groupId: number | undefined;

    // TODO: Set a proper type for query options
    queryOptions?: Object;
}

export const useGetTaskGroups = ({ projectId, groupId, queryOptions = {} }: UseGetTaskGroups) => {
    const fetchAllTaskGroups = async () => {
        return tasksService.getTaskGroupsForProject({
            projectId,
            groupId,
        });
    };

    return useQuery(["taskGroups", projectId, groupId], fetchAllTaskGroups, queryOptions);
};
