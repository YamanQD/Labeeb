interface IProjectStatus {
    title: string;
}

export interface IProjectList {
    id: number;
    title: string;
    taskCount: number;
}

export interface IProject {
    id: number;
    title: string;
    lists: IProjectList[];
    statuses: IProjectStatus[];
}
