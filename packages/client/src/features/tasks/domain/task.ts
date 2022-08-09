import { IUser } from "src/features/users/domain/user";

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
}

export interface ITaskTag {
    title: string;
}

export interface ITaskStatus {
    title: string;
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

/**
 * Converts a JavaScript date object to a string with the format "YYYY-MM-DD"
 */
export const formatDate = (date: Date): string => date.toISOString().slice(0, 10);
