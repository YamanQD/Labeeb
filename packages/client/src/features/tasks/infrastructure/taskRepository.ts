import { IHTTPClient } from "src/core/infrastructure/interfaces/IhttpClient";
import { ITasksRepository, TaskGroupFilters } from "../domain/ItaskRepository";
import { ITask, ITaskGroup } from "../domain/task";
import { CreateTaskDTO } from "../services";

export class TasksRepository implements ITasksRepository {
    constructor(private httpClient: IHTTPClient) {}

    public getTask(id: number): Promise<ITask> {
        throw new Error("Method not implemented.");
    }

    /**
     * Fetches all task groups and applies filters on them.
     */
    public async getTaskGroups(filters: TaskGroupFilters): Promise<ITaskGroup[]> {
        const { projectId, groupId } = filters;
        const response = await this.httpClient.request<ITaskGroup[]>({
            path: "/taskGroups",
            params: {
                project_id: projectId,
                id: groupId,
            },
        });

        return response;
    }

    public async createTask(task: CreateTaskDTO): Promise<ITask> {
        const response = await this.httpClient.request<ITask>({
            path: "/taskGroups",
            body: task,
        });

        return response;
    }
}
