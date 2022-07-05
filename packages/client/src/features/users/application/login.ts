import { UserCredentials } from "../domain/user";
import { userService } from "../services";

export const login = async (credentials: UserCredentials) => {
    await userService.login(credentials);
}