import { IUserRepository } from "../domain/IuserRepository";
import { IUser } from "../domain/user";
import { UserCredentialsDTO, UserDTO } from "./dto";
import { UserMapper } from "./mappers";

export class UserService {
    constructor(private userRepository: IUserRepository) {}

    public async login(credentials: UserCredentialsDTO): Promise<UserDTO> {
        const loginResponse = await this.userRepository.login(credentials);
        const decodedUserInfo = this.decodeAccessTokens(loginResponse.access_token);
        
        return UserMapper.userToDTO(decodedUserInfo, loginResponse.access_token);
    }

    public async logout() {
        return await this.userRepository.logout();
    }

    private decodeAccessTokens(token: string): IUser {
        const tokenPayload = token.split('.')[1] ?? "";
        const decodedPayload = window.atob(tokenPayload);
        return JSON.parse(decodedPayload);
    }
}
