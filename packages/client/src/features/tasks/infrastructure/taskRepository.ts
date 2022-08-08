import { IHTTPClient } from "src/lib/http/IhttpClient";

import { ITasksRepository } from "../domain/ItaskRepository";
import { ITask, ITaskDetails, ITaskList } from "../domain/task";
import { CreateTaskDTO, EditTaskDTO } from "../services";

export class TasksRepository implements ITasksRepository {
    constructor(private httpClient: IHTTPClient) {}

    public async createTask(task: CreateTaskDTO): Promise<ITask> {
        const response = await this.httpClient.request<ITask>({
            path: `/tasks`,
            body: task,
            method: "POST",
        });

        return response;
    }

    public async getTask(id: number): Promise<ITaskDetails> {
        const response = await this.httpClient.request<ITaskDetails>({
            path: `/tasks/${id}`,
        });

        return response;
    }

    public async editTask(id: number, editedTask: EditTaskDTO): Promise<ITaskDetails> {
        const response = await this.httpClient.request<ITaskDetails>({
            path: `/tasks/${id}`,
            method: "PATCH",
            body: editedTask
        });

        return response;   
    }

    public async deleteTask(id: number) {
        const response = await this.httpClient.request<Promise<void>>({
            path: `/tasks/${id}`,
            method: "DELETE",
        });

        return response;
    }

    public async getTaskListsForProject(projectId: number): Promise<ITaskList[]> {
        const response = await this.httpClient.request<ITaskList[]>({
            path: `/projects/${projectId}/tasks`,
            parser(data) {
                return data.lists;
            },
        });

        return response;
    }

    public async getTaskList(listId: number): Promise<ITaskList> {
        const response = await this.httpClient.request<ITaskList>({
            path: `/lists/${listId}`,
        });

        return response;
    }
}
