import { Role } from "@labeeb/core";

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
