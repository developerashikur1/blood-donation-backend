import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    // console.log(token?.split(' '))
    // console.log('🚀 ~ auth ~ token:', extractAccessTokenFromBearer(token as string));

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    const extractToken = extractAccessTokenFromBearer(token as string);
    let verifiedUser = null;

    verifiedUser = jwtHelpers.verifyToken(
      extractToken,
      config.jwt.access_secret as Secret,
    );

    req.user = verifiedUser;

    if(requiredRoles.length && !requiredRoles.includes(verifiedUser.role)){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Forbidden');
    }

    // const user = await User.findOne({ email: verifiedUser.email });
    // if (!user) {
    // }
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;

function extractAccessTokenFromBearer(bearerToken: string) {
  if (bearerToken.startsWith('Bearer ')) {
    const accessToken = bearerToken.slice(7);
    return accessToken;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Bearer token format');
  }
}
