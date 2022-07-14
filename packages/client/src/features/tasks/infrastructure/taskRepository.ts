import { IHTTPClient } from "src/core/infrastructure/interfaces/IhttpClient";
import { ITasksRepository } from "../domain/ItaskRepository";
import { ITask, ITaskList } from "../domain/task";
import { CreateTaskDTO } from "../services";

export class TasksRepository implements ITasksRepository {
    constructor(private httpClient: IHTTPClient) {}

    public getTask(id: number): Promise<ITask> {
        throw new Error("Method not implemented.");
    }

    public async getTaskListsForProject(projectId: number): Promise<ITaskList[]> {
        const response = await this.httpClient.request<ITaskList[]>({
            path: `/projects/${projectId}/tasks`,
            parser(data) {
                return data.lists;
            }
        });

        return response;
    }

    public async getTaskList(listId: number): Promise<ITaskList> {
        const response = await this.httpClient.request<ITaskList>({
            path: `/lists/${listId}`,
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
