import { Priority } from "@labeeb/core";
import { UserDTO } from "src/features/users/types/user.dto";

export interface TaskDetailsDTO extends TaskDTO {
    listId: number;
    projectId: number;
    createdAt: Date;
    owner: UserDTO;
    assignees: UserDTO[];
}

export interface TaskStatusDTO {
    title: string;
    color: string;
}

export interface TaskTagDTO {
    title: string;
}

export interface TaskDTO {
    id: number;
    title: string;
    description?: string;
    deadline?: Date;

    status: TaskStatusDTO;
    tags: TaskTagDTO[];
    priority: Priority;
}

export interface TaskGroupDTO {
    id: number;
    status: TaskStatusDTO;
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
    priority: Priority;
}

export interface EditTaskDTO extends Partial<CreateTaskDTO> {
    id: number;
}
