export interface TaskDTO {
    id: number;
    title: string;
}

export interface TaskListDTO {
    id: number;
    status: string;
    tasks: TaskDTO[];
}

export interface TaskGroupDTO {
    id: number;
    title: string;
    taskLists: TaskListDTO[];
}