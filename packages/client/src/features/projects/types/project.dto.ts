import { TaskStatusDTO, TaskTagDTO } from "src/features/tasks/application";
import { UserDTO } from "src/features/users/types/user.dto";

export interface ProjectListDTO {
    id: number;
    title: string;
    taskCount: number;
}

export interface ProjectDTO {
    id: number;
    title: string;
    lists: ProjectListDTO[];
    statuses: TaskStatusDTO[];
    tags: TaskTagDTO[];
    users: UserDTO[];
    finalStatus: string;
}
