import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IDonationPost, IDonationPostFilters } from './donations.interface';
import { Donations } from './donations.model';

const createDonation = async (
  donation: IDonationPost,
): Promise<IDonationPost | null> => {
  const createDonation = await Donations.create(donation);
  if (!createDonation) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create product');
  }
  return createDonation;
};

const updateDonation = async (
  productId: string,
  payload: Partial<IDonationPost>,
): Promise<IDonationPost | null> => {
  const isExist = await Donations.findOne({ _id: productId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Donation not found');
  }
  const updatedDonationData: Partial<IDonationPost> = { ...payload };
  const result = await Donations.findOneAndUpdate(
    { _id: productId },
    updatedDonationData,
    { new: true },
  );

  return result;
};

const deleteSingleDonation = async (
  productId: string,
): Promise<IDonationPost | null> => {
  const isExist = await Donations.findOne({ _id: productId });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Donation not found');
  }

  const product = await Donations.findOneAndDelete({ _id: productId });

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to delete product');
  }

  return null;
};

// const deleteMultipleDonation = async (
//   productIds: string[],
// ): Promise<IDeletedDonationsResponse | undefined> => {
//   if (!Array.isArray(productIds)) {
//     throw new ApiError(
//       httpStatus.NOT_ACCEPTABLE,
//       'DonationIds is not an array.',
//     );
//   }

//   const findDonations = await Donations.find({
//     _id: { $in: productIds.map(id => new ObjectId(id)) },
//   });

//   if (findDonations.length === 0) {
//     throw new ApiError(
//       httpStatus.NOT_FOUND,
//       'Donations not found in the inventory',
//     );
//   }

//   const deletedDonations = await Donations.deleteMany({
//     _id: { $in: productIds.map(id => new ObjectId(id)) },
//   });

//   if (!deletedDonations) {
//     throw new ApiError(
//       httpStatus.UNPROCESSABLE_ENTITY,
//       'Unable to delete resource due to failed',
//     );
//   }

//   return deletedDonations;
// };

const getSingleDonation = async (
  productId: string,
): Promise<IDonationPost | null> => {
  const product = await Donations.findById(productId);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Donation not found');
  }

  return product;
};

const getAllDonations = async (
  filters: IDonationPostFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IDonationPost[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  console.log(sortOrder);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: [
        {
          category: {
            $regex: searchTerm,
            $options: 'i',
          },
        },
      ],
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  //   console.log(andConditions);

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Donations.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Donations.countDocuments(whereConditions);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Donation retrieved failed');
  }

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const DonationService = {
  createDonation,
  updateDonation,
  deleteSingleDonation,
  getSingleDonation,
  getAllDonations,
};
