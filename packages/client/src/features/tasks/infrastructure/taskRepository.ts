import { IHTTPClient } from "src/core/infrastructure/interfaces/IhttpClient";
import { ITasksRepository, TaskListFilters } from "../domain/ItaskRepository";
import { ITask, ITaskList } from "../domain/task";
import { CreateTaskDTO } from "../services";

export class TasksRepository implements ITasksRepository {
    constructor(private httpClient: IHTTPClient) {}

    public getTask(id: number): Promise<ITask> {
        throw new Error("Method not implemented.");
    }

    public async getTaskLists(filters: TaskListFilters): Promise<ITaskList[]> {
        const { projectId, listId } = filters;
        const path = listId
            ? `/projects/${projectId}/groups/${listId}`
            : `/projects/${projectId}/groups`;

        const response = await this.httpClient.request<ITaskList[]>({
            path,
        });

        return response;
    }

    public async createTask(task: CreateTaskDTO): Promise<ITask> {
        const response = await this.httpClient.request<ITask>({
            path: `/projects/${task.projectId}/groups/${task.listId}`,
            body: task,
            method: "POST",
        });

        return response;
    }
}
