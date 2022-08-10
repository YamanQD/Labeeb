import { UserDTO } from "src/features/users/services/dto";
import { ETaskPriority } from "./task";

export interface TaskDetailsDTO extends TaskDTO {
    listId: number;
    projectId: number;
    createdAt: Date;
    owner: UserDTO;
}

export interface TaskStatusDTO {
    title: string;
}

export interface TaskTagDTO {
    title: string;
}

export interface TaskDTO {
    id: number;
    title: string;
    description?: string;
    deadline: Date;

    status: TaskStatusDTO;
    tags: TaskTagDTO[];
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
    tasksCount: number;
    taskGroups: TaskGroupDTO[];
}

export interface CreateTaskDTO {
    listId: number;
    title: string;
    description?: string;
    status: string;
    tags: string[];
    priority: ETaskPriority;
}

export interface EditTaskDTO extends Partial<CreateTaskDTO> {
    id: number;
}
