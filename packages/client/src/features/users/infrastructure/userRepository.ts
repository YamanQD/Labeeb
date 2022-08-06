import { IHTTPClient } from "src/core/infrastructure/interfaces/IhttpClient";
import { IUserRepository } from "../domain/IuserRepository";
import { ILoginResponse } from "../domain/user";
import { UserCredentialsDTO } from "../services/dto";

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

    async logout() {
        return Promise.resolve(true);
    }
}
