import { IUserRepository } from "../domain/IuserRepository";
import { IUserCredentials } from "../domain/user";

export class UserService {
    constructor(private userRepository: IUserRepository) {}

    async login(credentials: IUserCredentials) {
        return await this.userRepository.login(credentials);
    }

    async logout() {
        return await this.userRepository.logout();
    }
}
