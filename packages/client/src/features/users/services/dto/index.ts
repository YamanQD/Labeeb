import { Role } from "@labeeb/core";

export interface UserCredentialsDTO {
    email: string;
    password: string;
}

export interface UserDTO {
    id: number;
    name: string;
    role: Role;
    access_token: string;
}

export interface UserProfileDTO {
    id: number;
    name: string;
    role: Role;
    access_token: string;
}

export interface CreateUserDTO {
    username: string;
    password: string;
    role: Role
}