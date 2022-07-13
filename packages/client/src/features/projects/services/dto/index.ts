interface ProjectStatusDTO {
    id: number;
    label: string;
}

export interface ProjectListDTO {
    id: number;
    title: string;
    tasksCount: number;
}

export interface ProjectDTO {
    id: number;
    title: string;
    lists: ProjectListDTO[];
    statuses: ProjectStatusDTO[];
}
