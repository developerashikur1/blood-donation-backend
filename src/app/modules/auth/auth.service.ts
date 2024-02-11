import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import {
  ILoginUserResponse,
  IRefreshTokenResponse,
  TLoginUser,
} from './auth.interface';

const loginUser = async (payload: TLoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  //   console.log(payload, isUserExist)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, (await isUserExist).password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password in incorrect');
  }

  // const {email} = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { email, role: isUserExist.role },
    config.jwt.access_secret as Secret,
    config.jwt.access_expires as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { email, role: isUserExist.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { email } = verifiedToken;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    { email },
    config.jwt.access_secret as Secret,
    config.jwt.access_expires as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
};
