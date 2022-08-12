import { TaskStatusDTO, TaskTagDTO } from "src/features/tasks/application";
import { UserDTO } from "src/features/users/types/user.dto";

export interface ProjectDTO {
    id: number;
    title: string;
    lists: { id: number; title: string; taskCount: number }[];
    statuses: TaskStatusDTO[];
    tags: TaskTagDTO[];
    users: UserDTO[];
    finalStatus: string;
}

export interface CreateProjectDTO {
    title: string;
    description?: string;
    tags: string[];
    statuses: {
        title: string;
        color: string;
    }[];

    userIds: number[];
    finalStatus: string;
};

export interface EditProjectDTO extends CreateProjectDTO {
    id: number;
}