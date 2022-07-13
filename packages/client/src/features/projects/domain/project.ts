interface IProjectStatus {
    id: number;
    label: string;
}

export interface IProjectList {
    id: number;
    name: string;
    tasksCount: number;
}

export interface IProject {
    id: number;
    name: string;
    lists: IProjectList[];
    statuses: IProjectStatus[];
}
