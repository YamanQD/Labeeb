interface IProjectStatus {
    title: string;
}

export interface IProjectList {
    id: number;
    title: string;
    tasksCount: number;
}

export interface IProject {
    id: number;
    title: string;
    lists: IProjectList[];
    statuses: IProjectStatus[];
}
