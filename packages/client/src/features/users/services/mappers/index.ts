import { IUser } from "../../domain/user";
import { UserDTO } from "../dto";

export class UserMapper {
    static userToDTO(user: IUser, access_token: string): UserDTO {
        return {
            id: user.sub,
            name: user.username,
            role: user.role,
            access_token
        }
    }
}