export interface ILoginResponse {
    access_token: string;
}

export interface IUser {
    exp: number;
    iat: number;
    role: string;
    sub: number;
    username: string;
}
