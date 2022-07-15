import { IUser } from "../../domain/user";
import { UserDTO } from "../dto";

export class UserMapper {
    static userToDTO(user: IUser): UserDTO {
        return user;
    }
}