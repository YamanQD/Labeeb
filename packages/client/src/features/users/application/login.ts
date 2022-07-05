import { IUserCredentials } from "../domain/user";
import { userService } from "../services";

export const login = async (credentials: IUserCredentials) => {
    await userService.login(credentials);
};
