import { IProjectList } from "../types/list";
import { ProjectListDTO } from "../types/list.dto";

export class ListMapper {
    static listToDTO(list: IProjectList): ProjectListDTO {
        return list;
    }
}
