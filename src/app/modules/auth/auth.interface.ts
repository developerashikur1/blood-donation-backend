
export type TLoginUser = {
    email: string;
    password: string;
}

export type ILoginUserResponse = {
    accessToken: string;
    refreshToken?:string;
}

export type IRefreshTokenResponse = {
    accessToken: string;
}

export type IVerifiedLoginUser = {
    userId: string;
    role?: 'user' | 'admin';
}


