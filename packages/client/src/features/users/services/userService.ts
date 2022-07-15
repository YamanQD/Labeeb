import { IUserRepository } from "../domain/IuserRepository";
import { UserCredentialsDTO, UserDTO } from "./dto";
import { UserMapper } from "./mappers";

export class UserService {
    constructor(private userRepository: IUserRepository) {}

    async login(credentials: UserCredentialsDTO): Promise<UserDTO> {
        const user = await this.userRepository.login(credentials);
        return UserMapper.userToDTO(user);
    }

    async logout() {
        return await this.userRepository.logout();
    }
}
