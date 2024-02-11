import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
    phone: z.string({
      required_error: 'phone is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    role: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
