import { IHTTPClient } from "src/core/infrastructure/interfaces/IhttpClient";
import { IUserRepository } from "../domain/IuserRepository";
import { ILoginResponse } from "../domain/user";
import { CreateUserDTO, UserCredentialsDTO } from "../services/dto";

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

    public async getUser(id: number): Promise<void> {
        const response = await this.httpClient.request<Promise<void>>({
            path: "/users",
            method: "GET",
            params: {
                user_id: id,
            },
        });

        return response;
    }
}
