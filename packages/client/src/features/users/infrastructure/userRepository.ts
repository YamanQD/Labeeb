import { IHTTPClient, PaginatedResponse } from "src/lib/http/IhttpClient";

import { IUserRepository } from "../domain/IuserRepository";
import { ILoginResponse, IUser } from "../domain/user";
import { CreateUserDTO, EditUserDTO, UserCredentialsDTO } from "../services/dto";

export class UserRepository implements IUserRepository {
    constructor(private httpClient: IHTTPClient) {}

    async login({ email, password }: UserCredentialsDTO): Promise<ILoginResponse> {
        const response = await this.httpClient.request<ILoginResponse>({
            path: "/auth/login",
            method: "POST",
            body: {
                email,
                password,
            },
        });

        return response;
    }

    async register(user: CreateUserDTO): Promise<void> {
        const response = await this.httpClient.request<Promise<void>>({
            path: "/auth/register",
            method: "POST",
            body: user,
        });

        return response;
    }

    public async getUsers({ page = 1 }): Promise<PaginatedResponse<IUser[]>> {
        const response = await this.httpClient.request<Promise<PaginatedResponse<IUser[]>>>({
            path: "/users",
            method: "GET",
            params: {
                page,
            },
        });

        return response;
    }

    public async getUser(id: number): Promise<IUser> {
        const response = await this.httpClient.request<Promise<IUser>>({
            path: `/users/${id}`,
            method: "GET",
        });

        return response;
    }

    public async editUser(user: EditUserDTO): Promise<void> {
        await this.httpClient.request<Promise<void>>({
            path: `/users/${user.id}`,
            method: "PATCH",
            body: user,
        });
    }

    public async deleteUser(id: number): Promise<void> {
        await this.httpClient.request<Promise<void>>({
            path: `/users/${id}`,
            method: "DELETE",
        });
    }
}
