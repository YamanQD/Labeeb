import { ETaskPriority } from "../../domain/task";

export interface TaskDTO {
    id: number;
    title: string;
    status: string;
    priority: ETaskPriority;
}

export interface TaskListDTO {
    id: number;
    status: string;
    tasks: TaskDTO[];
}

export interface TaskGroupDTO {
    id: number;
    title: string;
    taskLists: TaskListDTO[];
}

export interface CreateTaskDTO {
    projectId: number;
    groupId: number;

    title: string;
    description?: string;
    status: string;
    priority: ETaskPriority;
}
