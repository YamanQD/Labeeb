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

export interface ITask {
    id: number;
    title: string;
    status: string;
    priority: ETaskPriority;
}

export interface ITaskGroup {
    id: number;
    title: string;
    tasks: ITask[];
}
