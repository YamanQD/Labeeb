import { CreateUserDTO, UserCredentialsDTO } from "../services/dto";
import { ILoginResponse } from "./user";

export interface IUserRepository {
    login(credentials: UserCredentialsDTO): Promise<ILoginResponse>;
    register(user: CreateUserDTO): Promise<void>;
    getUser(id: number): Promise<void>;
}
