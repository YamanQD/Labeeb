import { Role } from "@labeeb/core";
import { permissions } from "../application/permissions";

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
    username: string;
    email: string;
    role: Role;
}

export const canUserAccessAdminPanel = (user: Pick<IUserProfile, "role"> | null) => {
    if (!user) return false;

    return permissions.ADMINS_ONLY.includes(user.role);
};

export const canAdminCreateProject = (user: Pick<IUserProfile, "role"> | null) => {
    if (!user) return false;

    return permissions.ADMINS_ABOVE_PM.includes(user.role);
};
