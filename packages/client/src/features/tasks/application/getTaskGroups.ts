import { useQuery } from "react-query";
import { HTTPClient } from "src/core/infrastructure/http/httpClient";
import { TasksRepository } from "../infrastructure/taskRepository";
import { TasksService } from "../services/taskService";

const httpClient = new HTTPClient();
const tasksRepository = new TasksRepository(httpClient);
const tasksService = new TasksService(tasksRepository);

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
