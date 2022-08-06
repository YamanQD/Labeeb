import { Role } from "@labeeb/core";
import { permissions } from "./permissions";

export interface ILoginResponse {
    access_token: string;
}

export interface IUser {
    exp: number;
    iat: number;
    role: Role;
    sub: number;
    username: string;
}

export const canUserAccessAdminPanel = (user: Pick<IUser, "role"> | null) => {
    if (!user) return false;

    return permissions.ADMINS_ONLY.includes(user.role);
};
