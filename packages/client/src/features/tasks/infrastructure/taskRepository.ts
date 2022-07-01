import { IHTTPClient } from "src/core/infrastructure/interfaces/IhttpClient";
import { ITask, ITaskGroup, ITaskList } from "../domain/task";
import { ITasksRepository } from "../domain/ItaskRepository";

interface TaskDTO {
    id: number;
    title: string;
}

interface TaskListDTO {
    id: number;
    status: string;
    tasks: TaskDTO[];
}

interface TaskGroupDTO {
    id: number;
    title: string;
    taskLists: TaskListDTO[]
}


const dtoToTask = (dto: TaskDTO): ITask => {
    return dto;
}


const dtoToTaskList = (dto: TaskListDTO): ITaskList => {
    return dto;
}

const dtoToTaskGroup = (dto: TaskGroupDTO): ITaskGroup => {
    return dto;
}

export class TasksRepository implements ITasksRepository {
    constructor(private httpClient: IHTTPClient) {}

    public getTask(id: number): Promise<ITask> {
        throw new Error("Method not implemented.");
    }

    public async getAllTaskGroups(): Promise<ITaskGroup[]> {
        const response = await this.httpClient.request<TaskGroupDTO[]>({
            path: "/taskGroups",
        });

        const taskGroups = response.map(dtoToTaskGroup);
        return taskGroups;
    }

    public getTaskGroupByProjectID(projectID: number): Promise<ITaskGroup> {
        throw new Error("Method not implemented.");
    }
}
