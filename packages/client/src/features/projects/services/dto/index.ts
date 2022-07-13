interface ProjectStatusDTO {
    id: number;
    label: string;
}

export interface ProjectListDTO {
    id: number;
    name: string;
    tasksCount: number;
}

export interface ProjectDTO {
    id: number;
    name: string;
    lists: ProjectListDTO[];
    statuses: ProjectStatusDTO[];
}
