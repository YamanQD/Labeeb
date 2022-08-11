export interface ProjectListDTO {
    id: number;
    title: string;
    project: {
        id: number;
        title: string;
    };
}

export interface CreateProjectListDTO {
    title: string;
    projectId: number;
}

export interface EditProjectListDTO {
    id: number;
    title: string;
}
