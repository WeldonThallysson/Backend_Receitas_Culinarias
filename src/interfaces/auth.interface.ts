export interface ILoginRequest {
    login: string;
    password: string;
}


export interface IResetPasswordRequest {
    oldPassword: string;
    newPassword: string;
    token: string;
}