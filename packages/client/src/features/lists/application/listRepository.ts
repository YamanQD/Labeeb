import { IHTTPClient } from "src/lib/http/IhttpClient";
import { IProjectList } from "../types/list";
import { CreateProjectListDTO, EditProjectListDTO } from "../types/list.dto";
import { IListRepository } from "./IlistRepository";

export class ListRepository implements IListRepository {
    constructor(private httpClient: IHTTPClient) {}

    public async getList(id: number): Promise<IProjectList> {
        const response = await this.httpClient.request<IProjectList>({
            method: "GET",
            path: `/lists/${id}`,
        });

        return response;
    }

    public async editList(list: EditProjectListDTO): Promise<void> {
        await this.httpClient.request<void>({
            path: `/lists/${list.id}`,
            method: "PATCH",
            body: list,
        });
    }

    public async deleteList(id: number): Promise<void> {
        await this.httpClient.request<void>({
            path: `/lists/${id}`,
            method: "DELETE",
        });
    }

    public async createList(list: CreateProjectListDTO): Promise<void> {
        await this.httpClient.request<void>({
            path: "/lists",
            method: "POST",
            body: list,
        });
    }

    public async getLists(): Promise<IProjectList[]> {
        const response = await this.httpClient.request<IProjectList[]>({
            path: "/lists",
            method: "GET",
        });

        return response;
    }
}
