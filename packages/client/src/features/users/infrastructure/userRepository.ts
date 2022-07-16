import { IHTTPClient } from "src/core/infrastructure/interfaces/IhttpClient";
import { IUserRepository } from "../domain/IuserRepository";
import { IUser } from "../domain/user";
import { UserCredentialsDTO } from "../services/dto";

export class UserRepository implements IUserRepository {
    constructor(private httpClient: IHTTPClient) {}

    async login({ email, password }: UserCredentialsDTO): Promise<IUser> {
        const response = await this.httpClient.request<IUser>({
            path: "/auth/login",
            method: "POST",
            body: {
                username: email,
                password,
            },
        });

        return response;
    }

    async logout() {
        return Promise.resolve(true);
    }
}
