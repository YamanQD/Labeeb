import { ITaskStatus, ITaskTag } from "src/features/tasks/domain/task";

export interface IProjectList {
    id: number;
    title: string;
    taskCount: number;
}

export interface IProject {
    id: number;
    title: string;
    lists: IProjectList[];
    statuses: ITaskStatus[];
    tags: ITaskTag[];
}
