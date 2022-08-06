import { IUser } from "../../domain/user";

export const decodeAccessTokens = (token: string): IUser => {
    const tokenPayload = token.split('.')[1] ?? "";
    const decodedPayload = window.atob(tokenPayload);
    return JSON.parse(decodedPayload);
}