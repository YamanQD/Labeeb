export interface ITask {
    id: number;
    title: string;
    status: string;
}

export interface ITaskGroup {
    id: number;
    title: string;
    tasks: ITask[];
}
