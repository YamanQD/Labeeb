import { CreateTaskDTO } from "../services";
import { ITask, ITaskGroup } from "./task";

export interface TaskGroupFilters {
    projectId: number | undefined;
    groupId: number | undefined;
}

export interface ITasksRepository {
    getTask(id: number): Promise<ITask>;
    getTaskGroups(filters: TaskGroupFilters): Promise<ITaskGroup[]>;

    createTask(task: CreateTaskDTO): Promise<ITask>;
}
