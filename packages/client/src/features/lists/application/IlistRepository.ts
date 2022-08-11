import { IProjectList } from "src/features/lists/types/list";
import { CreateProjectListDTO, EditProjectListDTO } from "../types/list.dto";

export interface IListRepository {
    getList(id: number): Promise<IProjectList>;
    createList(list: CreateProjectListDTO): Promise<void>;
    editList(list: EditProjectListDTO): Promise<void>;
    deleteList(id: number): Promise<void>;

    getLists(): Promise<IProjectList[]>;
}
