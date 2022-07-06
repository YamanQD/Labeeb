export interface IProjectGroup {
    id: number;
    title: string;
    tasksCount: number;
}

export interface IProject {
    id: number;
    title: string;
    groups: IProjectGroup[];
}
