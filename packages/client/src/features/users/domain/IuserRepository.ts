import { UserCredentials } from "./user";

export interface IUserRepository {
    login(credentials: UserCredentials): Promise<boolean>;
    logout(): Promise<boolean>;
}