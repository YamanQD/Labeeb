import { UserCredentialsDTO } from "../services/dto";
import { IUser } from "./user";

export interface IUserRepository {
    login(credentials: UserCredentialsDTO): Promise<IUser>;
    logout(): Promise<boolean>;
}
