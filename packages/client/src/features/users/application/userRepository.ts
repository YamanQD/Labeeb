import { IHTTPClient, PaginatedRequestOptions, PaginatedResponse } from "src/lib/http/IhttpClient";
import { ILoginResponse, IUser } from "../types/user";
import { CreateUserDTO, EditUserDTO, UserCredentialsDTO } from "../types/user.dto";
import { IUserRepository } from "./IuserRepository";

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

    public async getUsers(): Promise<IUser[]>;
    public async getUsers(options: PaginatedRequestOptions): Promise<PaginatedResponse<IUser[]>>;
    public async getUsers(options?: PaginatedRequestOptions) {
        if (!options) {
            const nonPaginatedUsers = await this.httpClient.request<IUser[]>({
                path: "/users",
                method: "GET",
                params: {
                    paginate: false,
                },
            });

            return nonPaginatedUsers;
        } else {
            const paginatedUsers = await this.httpClient.request<PaginatedResponse<IUser[]>>({
                path: "/users",
                method: "GET",
                params: {
                    paginate: true,
                    page: 1,
                },
            });

            return paginatedUsers;
        }
    }

    public async getUser(id: number): Promise<IUser> {
        const response = await this.httpClient.request<Promise<IUser>>({
            path: `/users/${id}`,
            method: "GET",
        });

        return response;
    }

    public async getUsersForProject(projectId: number): Promise<IUser[]> {
        const response = await this.httpClient.request<Promise<IUser[]>>({
            path: `/projects/${projectId}/users`,
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
