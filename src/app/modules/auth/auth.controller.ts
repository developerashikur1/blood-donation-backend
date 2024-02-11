import { Request, Response } from 'express';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse } from './auth.interface';
import { AuthService } from './auth.service';
import httpStatus from 'http-status';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const {...loginData} = req.body;

  const { refreshToken, ...others } = await AuthService.loginUser(loginData);

  const cookiesOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookiesOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: others,
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
    res.cookie('refreshToken', '', {
        httpOnly: true,
        expires: new Date(0),
    })

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged out successfully',
    data: null,
  });
});

export const AuthController = {
  loginUser,
  logoutUser,
};
