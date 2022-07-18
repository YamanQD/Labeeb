import { ETaskPriority } from "../../domain/task";

export interface TaskDetailsDTO extends TaskDTO {
    listId: number;
    projectId: number;
}

export interface TaskDTO {
    id: number;
    title: string;
    description?: string;

    status: string;
    priority: ETaskPriority;
}

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
    listId: number;

    title: string;
    description?: string;
    status: string;
    priority: ETaskPriority;
}

export interface EditTaskDTO extends Partial<CreateTaskDTO> {
    id: number;
}
