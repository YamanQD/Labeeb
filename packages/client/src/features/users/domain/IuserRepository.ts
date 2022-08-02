import { UserCredentialsDTO } from "../services/dto";
import { ILoginResponse } from "./user";

export interface IUserRepository {
    login(credentials: UserCredentialsDTO): Promise<ILoginResponse>;
    logout(): Promise<boolean>;
}
