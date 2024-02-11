import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TUser } from './user.interface';
import { UserService } from './user.service';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.body;

    const result = await UserService.createUser(user);

    sendResponse<TUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  },
);

const getAllUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.getAllUsers();

    sendResponse<TUser[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users get successfully',
      data: result,
    });
  },
);

const getUserProfile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.user;
    const result = await UserService.getUserProfile(email);

    sendResponse<TUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieved successfully',
      data: result,
    });
  },
);

export const UserController = {
  createUser,
  getAllUsers,
  getUserProfile,
};
