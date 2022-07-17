import { CreateTaskDTO } from "../services";
import { ITask, ITaskDetails, ITaskList } from "./task";

export interface ITasksRepository {
    getTask(id: number): Promise<ITaskDetails>;

    getTaskList(listId: number): Promise<ITaskList>;
    getTaskListsForProject(projectId: number): Promise<ITaskList[]>;

    createTask(task: CreateTaskDTO): Promise<ITask>;
}
