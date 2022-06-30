export interface ITask {
    id: number;
    title: string;
}

export interface ITaskList {
    id: number;
    status: string;
    tasks: ITask[];
}

export interface ITaskGroup {
    id: number;
    title: string;
    lists: ITaskList[];
}
