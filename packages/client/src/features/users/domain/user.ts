import { Role } from "@labeeb/core";
import { permissions } from "./permissions";

export interface ILoginResponse {
    access_token: string;
}

export interface IUserProfile {
    exp: number;
    iat: number;
    role: Role;
    sub: number;
    username: string;
}

export interface IUser {
    id: number;
    name: string;
    role: Role;
}

export const canUserAccessAdminPanel = (user: Pick<IUserProfile, "role"> | null) => {
    if (!user) return false;

    return permissions.ADMINS_ONLY.includes(user.role);
};
