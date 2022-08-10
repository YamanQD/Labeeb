import { TaskStatusDTO, TaskTagDTO } from "src/features/tasks/application";

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
}
