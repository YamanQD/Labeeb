import { CreateProjectListDTO, EditProjectListDTO, ProjectListDTO } from "../types/list.dto";
import { IListRepository } from "./IlistRepository";
import { ListMapper } from "./listMapper";

export class ListService {
    constructor(private listRepository: IListRepository) {}

    public async getList(id: number) {
        return this.listRepository.getList(id);
    }

    public async editList(list: EditProjectListDTO) {
        return this.listRepository.editList(list);
    }

    public async deleteList(id: number) {
        return this.listRepository.deleteList(id);
    }

    public async getLists(): Promise<ProjectListDTO[]> {
        const lists = await this.listRepository.getLists();
        return lists.map((list) => ListMapper.listToDTO(list));
    }

    public async createList(list: CreateProjectListDTO) {
        return this.listRepository.createList(list);
    }
}
