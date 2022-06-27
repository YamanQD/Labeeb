export interface ITask {
    id: number;
    title: string;
}

export interface ITasksList {
    id: number;
    title: string;
    color: string;
    tasks: ITask[];
}
