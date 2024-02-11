import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IDonationPost } from './donations.interface';
import { DonationService } from './donations.service';

const createDonation: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const donation = req.body;
    const result = await DonationService.createDonation(donation);

    sendResponse<IDonationPost>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donation created successfully',
      data: result,
    });
  },
);

const updateDonation: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const donationId = req.params.id;
    const donation = req.body;

    const result = await DonationService.updateDonation(donationId, donation);

    sendResponse<IDonationPost>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donation updated successfully',
      data: result,
    });
  },
);

const getSingleDonation: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const donationId = req.params.id;
    const result = await DonationService.getSingleDonation(donationId);

    sendResponse<IDonationPost>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donation retrieved successfully',
      data: result,
    });
  },
);

const getAllDonations: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = req.query;
    const paginationOptions = pick(req.query, paginationFields);
    const result = await DonationService.getAllDonations(
      filters,
      paginationOptions,
    );

    sendResponse<IDonationPost[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donations retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  },
);

const deleteDonation: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const donationId = req.params.id;

    const result = await DonationService.deleteSingleDonation(donationId);

    sendResponse<IDonationPost>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donation deleted successfully',
      data: result,
    });
  },
);
export const DonationController = {
  createDonation,
  updateDonation,
  deleteDonation,
  getAllDonations,
  getSingleDonation,
};
