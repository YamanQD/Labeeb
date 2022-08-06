import { IUserProfile } from "../../domain/user";

export const decodeAccessTokens = (token: string): IUserProfile => {
    const tokenPayload = token.split(".")[1] ?? "";
    const decodedPayload = window.atob(tokenPayload);
    return JSON.parse(decodedPayload);
};
