import { IUserRepository } from "../application/IuserRepository";
import { CreateUserDTO, EditUserDTO, UserCredentialsDTO, UserProfileDTO } from "../types/user.dto";
import { UserMapper } from "./userMapper";
import { decodeAccessTokens } from "./utils";

export class UserService {
    constructor(private userRepository: IUserRepository) {}

    public async login(credentials: UserCredentialsDTO): Promise<UserProfileDTO> {
        const loginResponse = await this.userRepository.login(credentials);
        const decodedUserInfo = decodeAccessTokens(loginResponse.access_token);

        return UserMapper.userProfileToDTO(decodedUserInfo, loginResponse.access_token);
    }

    public async register(user: CreateUserDTO): Promise<void> {
        return await this.userRepository.register(user);
    }

    public async getUsers(page: number) {
        const users = await this.userRepository.getUsers({ page });
        users.items = users.items.map((user) => UserMapper.userToDTO(user));

        return users;
    }

    public async getUser(id: number) {
        return this.userRepository.getUser(id);
    }

    public async editUser(user: EditUserDTO): Promise<void> {
        return this.userRepository.editUser(user);
    }

    public async deleteUser(id: number): Promise<void> {
        return this.userRepository.deleteUser(id);
    }
}
