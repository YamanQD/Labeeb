export interface ITask {
    id: number;
    title: string;
}

export interface ITaskList {
    id: number;
    title: string;
    tasks: ITask[];
}
