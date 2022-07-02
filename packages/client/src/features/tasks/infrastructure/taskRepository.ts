import { IHTTPClient } from "src/core/infrastructure/interfaces/IhttpClient";
import { ITasksRepository } from "../domain/ItaskRepository";
import { ITask, ITaskGroup } from "../domain/task";
import { TaskGroupDTO } from "./dto";
import { TaskMapper } from "./mappers";

export class TasksRepository implements ITasksRepository {
    constructor(private httpClient: IHTTPClient) {}

    public getTask(id: number): Promise<ITask> {
        throw new Error("Method not implemented.");
    }

    public async getAllTaskGroupsForProject(projectId: number): Promise<ITaskGroup[]> {
        const response = await this.httpClient.request<TaskGroupDTO[]>({
            path: "/taskGroups",
            params: {
                project_id: projectId
            }
        });

        const taskGroups = response.map(TaskMapper.dtoToTaskGroup);
        return taskGroups;
    }

    public getTaskGroup(groupId: number): Promise<ITaskGroup> {
        throw new Error("Method not implemented.");
    }
}
