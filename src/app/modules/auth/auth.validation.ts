import { z } from "zod";

const signinZodSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required',
        }),
        password: z.string({
            required_error: 'Password is required',
        }),        
    }),
});

const refreshTokenZodSchema = z.object({
    body: z.object({
        refreshToken: z.string({
            required_error: 'Refresh Token is required',
        }),        
    }),
});

const changePasswordZodSchema = z.object({
    body: z.object({
        oldPassword: z.string({
            required_error: 'Email is required',
        }),
        newPassword: z.string({
            required_error: 'Password is required',
        }),        
    }),
});

export const AuthValidation = {
    signinZodSchema, 
    refreshTokenZodSchema,
    changePasswordZodSchema,
};