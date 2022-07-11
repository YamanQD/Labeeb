import { useQuery } from "react-query";
import { tasksService } from "../services";

interface UseGetTaskGroupsProps {
    projectId: number | undefined;
    groupId: number | undefined;

    // TODO: Set a proper type for query options
    queryOptions?: Object;
}

export const useGetTaskGroups = ({ projectId, groupId, queryOptions = {} }: UseGetTaskGroupsProps) => {
    const fetchAllTaskGroups = async () => {
        return tasksService.getTaskGroupsForProject({
            projectId,
            groupId,
        });
    };

    return useQuery(["taskGroups", projectId, groupId], fetchAllTaskGroups, queryOptions);
};
