import { useQuery } from "react-query";
import { HTTPClient } from "src/core/infrastructure/http/httpClient";
import { TasksRepository } from "../infrastructure/taskRepository";
import { TasksService } from "../services/taskService";

const httpClient = new HTTPClient();
const tasksRepository = new TasksRepository(httpClient);
const tasksService = new TasksService(tasksRepository);

export const useGetAllTaskGroupsForProject = (projectId: number) => {
    const fetchAllTaskGroups = async () => {
        return tasksService.getAllTaskGroupsForProject(projectId);
    };

    return useQuery("taskGroups", fetchAllTaskGroups);
};
