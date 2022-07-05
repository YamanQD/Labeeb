import { IUserRepository } from "../domain/IuserRepository";
import { UserCredentials } from "../domain/user";

export class UserService {
    constructor(private userRepository: IUserRepository) { }
    
    async login(credentials: UserCredentials) {
        return await this.userRepository.login(credentials);
    }

    async logout() {
        return await this.userRepository.logout();
    }
}