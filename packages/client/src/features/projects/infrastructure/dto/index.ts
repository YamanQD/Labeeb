export interface ProjectGroupDTO {
    id: number;
    title: string;
    tasksCount: number;
}

export interface ProjectDTO {
    id: number;
    title: string;
    groups: ProjectGroupDTO[]
}