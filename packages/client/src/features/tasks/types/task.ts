import { Priority } from "@labeeb/core";
import { IProjectList } from "src/features/lists/types/list";
import { IUser } from "src/features/users/types/user";


export const taskPriorities = [
    {
        value: Priority.NONE,
        label: "None",
    },

    {
        value: Priority.LOW,
        label: "Low",
    },

    {
        value: Priority.MEDIUM,
        label: "Medium",
    },

    {
        value: Priority.HIGH,
        label: "High",
    },
];

export interface ITaskDetails extends ITask {
    list: IProjectList;

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
    deadline?: string;
    status: ITaskStatus;
    tags: ITaskTag[];
    priority: Priority;
}

export interface ITaskList {
    id: number;
    title: string;
    tasks: ITask[];
}
