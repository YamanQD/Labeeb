import { PaginatedRequestOptions, PaginatedResponse } from "src/lib/http/IhttpClient";

import { CreateUserDTO, EditUserDTO, UserCredentialsDTO } from "../types/user.dto";
import { ILoginResponse, IUser } from "../types/user";

export interface IUserRepository {
    login(credentials: UserCredentialsDTO): Promise<ILoginResponse>;
    register(user: CreateUserDTO): Promise<void>;
    getUser(id: number): Promise<IUser>;


    getUsers(): Promise<IUser[]>;
    getUsers(options: PaginatedRequestOptions): Promise<PaginatedResponse<IUser[]>>;
    
    getUsersForProject(projectId: number): Promise<IUser[]>;
    editUser(user: EditUserDTO): Promise<void>;
    deleteUser(id: number): Promise<void>;
}
