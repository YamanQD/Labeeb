export interface ProjectGroup {
    id: number;
    title: string;
    tasksCount: number;
}

export interface Project {
    id: number;
    title: string;
    groups: ProjectGroup[]
}