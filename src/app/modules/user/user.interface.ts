import { Model } from 'mongoose';

export type TUser = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: 'user' | 'admin'
};

// export

export type UserModel = {
  isUserExist(email: string): Promise<Pick<TUser, 'email' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<TUser, Record<string, unknown>>;
