import { ETaskPriority } from "../../domain/task";

export interface TaskDTO {
    id: number;
    title: string;
    status: string;
    priority: ETaskPriority;
}

// HERE IT"S OKAY
export interface TaskGroupDTO {
    id: number;
    status: string;
    tasks: TaskDTO[];
}

export interface TaskListDTO {
    id: number;
    title: string;
    taskGroups: TaskGroupDTO[];
}

export interface CreateTaskDTO {
    projectId: number;
    listId: number;

    title: string;
    description?: string;
    status: string;
    priority: ETaskPriority;
}
