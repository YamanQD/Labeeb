import { IUserCredentials } from "./user";

export interface IUserRepository {
    login(credentials: IUserCredentials): Promise<boolean>;
    logout(): Promise<boolean>;
}
