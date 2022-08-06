import { IUserProfile } from "../../domain/user";
import { UserProfileDTO } from "../dto";

export class UserMapper {
    static userProfileToDTO(user: IUserProfile, access_token: string): UserProfileDTO {
        return {
            id: user.sub,
            name: user.username,
            role: user.role,
            access_token,
        };
    }
}
