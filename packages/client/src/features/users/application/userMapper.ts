import { IUser, IUserProfile } from "../types/user";
import { UserDTO, UserProfileDTO } from "../types/user.dto";

export class UserMapper {
    static userProfileToDTO(user: IUserProfile, access_token: string): UserProfileDTO {
        return {
            id: user.sub,
            username: user.username,
            role: user.role,
            access_token,
        };
    }

    static userToDTO(user: IUser): UserDTO {
        return user;
    }
}
