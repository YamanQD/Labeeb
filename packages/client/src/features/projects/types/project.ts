import { ITaskStatus, ITaskTag } from "src/features/tasks/types/task";
import { IUser } from "src/features/users/types/user";

export interface IProject {
    id: number;
    title: string;
    lists: { id: number; title: string; taskCount: number }[];
    statuses: ITaskStatus[];
    tags: ITaskTag[];
    users: IUser[];
    finalStatus: string;
}
