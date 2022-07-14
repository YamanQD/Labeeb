import { IHTTPClient } from "src/core/infrastructure/interfaces/IhttpClient";
import { IUserRepository } from "../domain/IuserRepository";
import { IUserCredentials } from "../domain/user";

export class UserRepository implements IUserRepository {
    constructor(private httpClient: IHTTPClient) {}

    async login({ email, password }: IUserCredentials) {
        return Promise.resolve(true);
    }

    async logout() {
        return Promise.resolve(true);
    }
}
