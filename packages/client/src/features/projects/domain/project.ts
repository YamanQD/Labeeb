interface IProjectStatus {
    id: number;
    label: string;
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
