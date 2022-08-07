import { Role } from "@labeeb/core";

export interface UserCredentialsDTO {
    email: string;
    password: string;
}

export interface UserDTO {
    id: number;
    username: string;
    email: string;
    role: Role;
}

export interface UserProfileDTO {
    id: number;
    username: string;
    role: Role;
    access_token: string;
}

export interface CreateUserDTO {
    username: string;
    email: string;
    password: string;
    role: Role;
}
