import { ITaskStatus, ITaskTag } from "src/features/tasks/types/task";
import { IUser } from "src/features/users/types/user";

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
    users: IUser[];
    finalStatus: string;
}
