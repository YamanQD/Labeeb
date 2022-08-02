interface ProjectStatusDTO {
    title: string;
}

export interface ProjectListDTO {
    id: number;
    title: string;
    taskCount: number;
}

export interface ProjectDTO {
    id: number;
    title: string;
    lists: ProjectListDTO[];
    statuses: ProjectStatusDTO[];
}
