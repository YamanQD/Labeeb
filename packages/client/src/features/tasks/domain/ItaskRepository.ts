import { CreateTaskDTO } from "../services";
import { ITask, ITaskList } from "./task";

export interface ITasksRepository {
    getTask(id: number): Promise<ITask>;

    getTaskList(listId: number): Promise<ITaskList>;
    getTaskListsForProject(projectId: number): Promise<ITaskList[]>;

    createTask(task: CreateTaskDTO): Promise<ITask>;
}
