import { IUser } from "src/features/users/types/user";

export enum ETaskPriority {
    NONE = "none",
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
}

export const taskPriorities = [
    {
        value: ETaskPriority.NONE,
        label: "None",
    },

    {
        value: ETaskPriority.LOW,
        label: "Low",
    },

    {
        value: ETaskPriority.MEDIUM,
        label: "Medium",
    },

    {
        value: ETaskPriority.HIGH,
        label: "High",
    },
];

export interface ITaskDetails extends ITask {
    list: {
        id: number;
        title: string;
        project: {
            id: number;
            title: string;
        };
    };

    createdAt: string;
    owner: IUser;
    assignees: IUser[];
}

export interface ITaskTag {
    title: string;
}

export interface ITaskStatus {
    title: string;
    color: string;
}

export interface ITask {
    id: number;
    title: string;
    description?: string;
    deadline: string;
    status: ITaskStatus;
    tags: ITaskTag[];
    priority: ETaskPriority;
}

export interface ITaskList {
    id: number;
    title: string;
    tasks: ITask[];
}