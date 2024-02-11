import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IDonateHistory } from './donateHistory.interface';
import { DonateHistoryService } from './donateHistory.service';

const createDonateHistory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const sales = req.body;
    const result = await DonateHistoryService.createDonateHistory(sales);

    sendResponse<IDonateHistory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donation successfully',
      data: result,
    });
  },
);

const getAllDonateHistory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const {email} = req.user;

    const paginationOptions = pick(req.query, paginationFields);

    const result = await DonateHistoryService.getAllDonateHistory(email as string, paginationOptions);

    sendResponse<IDonateHistory[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donation hitory retrieved successfully',
      data: result,
    });
  },
);

const getAllDonateHistoryWithPostId: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const paginationOptions = pick(req.query, paginationFields);

    const result = await DonateHistoryService.getAllDonateHistoryWithPostId(id as string, paginationOptions);

    sendResponse<IDonateHistory[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donation hitory retrieved successfully',
      data: result,
    });
  },
);

const getSingleDonateHistory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await DonateHistoryService.getSingleDonateHistory(id as string);

    sendResponse<IDonateHistory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donation hitory retrieved successfully',
    //   data: result,
    });
  },
);

export const DonateHistoryController = {
  createDonateHistory,
  getAllDonateHistory,
  getSingleDonateHistory,
  getAllDonateHistoryWithPostId,
};
