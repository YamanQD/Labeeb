import { CreateTaskDTO } from "../services";
import { ITask, ITaskList } from "./task";

export interface TaskListFilters {
    projectId: number | undefined;
    listId: number | undefined;
}

export interface ITasksRepository {
    getTask(id: number): Promise<ITask>;
    getTaskLists(filters: TaskListFilters): Promise<ITaskList[]>;

    createTask(task: CreateTaskDTO): Promise<ITask>;
}
