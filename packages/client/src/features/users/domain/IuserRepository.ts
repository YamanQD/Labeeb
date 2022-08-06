import { PaginatedRequestOptions, PaginatedResponse } from "src/lib/http/IhttpClient";
import { CreateUserDTO, UserCredentialsDTO } from "../services/dto";
import { ILoginResponse, IUser } from "./user";

export interface IUserRepository {
    login(credentials: UserCredentialsDTO): Promise<ILoginResponse>;
    register(user: CreateUserDTO): Promise<void>;
    getUser(id: number): Promise<void>;
    getUsers(options: PaginatedRequestOptions): Promise<PaginatedResponse<IUser[]>>;
}
