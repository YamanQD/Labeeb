import { CreateTaskDTO, EditTaskDTO } from "../services";
import { ITask, ITaskDetails, ITaskList } from "./task";

export interface ITasksRepository {
    createTask(task: CreateTaskDTO): Promise<ITask>;
    getTask(id: number): Promise<ITaskDetails>;
    editTask(id: number, editedTask: EditTaskDTO): Promise<ITaskDetails>;
    deleteTask(id: number): Promise<void>;

    getTaskList(listId: number): Promise<ITaskList>;
    getTaskListsForProject(projectId: number): Promise<ITaskList[]>;
}
