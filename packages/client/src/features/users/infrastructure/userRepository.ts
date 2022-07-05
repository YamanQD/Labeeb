import { HTTPClient } from "src/core/infrastructure/http/httpClient";
import { IUserRepository } from "../domain/IuserRepository";
import { UserCredentials } from "../domain/user";

export class UserRepository implements IUserRepository{
    constructor(private httpClient: HTTPClient) { }

    async login({ email, password } : UserCredentials) {
        return Promise.resolve(true);
    }

    async logout() {
        return Promise.resolve(true);
    }
}