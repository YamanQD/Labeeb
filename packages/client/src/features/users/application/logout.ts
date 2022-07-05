import { userService } from "../services";

export const logout = async () => {
    await userService.logout();
}