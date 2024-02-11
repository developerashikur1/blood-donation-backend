import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IDonateHistory } from './donateHistory.interface';
import { DonationHistory } from './donateHistory.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { User } from '../user/user.model';
import { ENUM_USER_ROLE } from '../../../enums/user';

const createDonateHistory = async (
  payload: IDonateHistory,
): Promise<IDonateHistory | null> => {
  const createDonations = await DonationHistory.create(payload);

  if (!createDonations) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Donation failed');
  }
  const donationObj: IDonateHistory = createDonations.toObject();

  return donationObj;
};

const getSingleDonateHistory = async (
  payload: string,
) => {
     // : Promise<IDonateHistory | null>
    // const history = await DonationHistory.findById()
}

const getAllDonateHistory = async (
    email: string,
  paginationOptions: IPaginationOptions,
): Promise<IDonateHistory[] | null> => {   

    const user = await User.isUserExist(email);
    if(!user){
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions);
  

    const sortConditions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }


    let result = null;
    
    
    if(user.role === ENUM_USER_ROLE.USER){
        const normalUser = await User.findOne({email: email});
        
        if(!normalUser){
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }
        result = await DonationHistory.find({user: normalUser._id})
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate('donationPost')
        .lean() as IDonateHistory[];
    }else{
        result = await DonationHistory.find({})
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate('user')
        .populate('donationPost')
        .lean() as IDonateHistory[];
    }


    if(!result){
        throw new ApiError(httpStatus.NOT_FOUND, 'No history found')
    }
    return result;
};

const getAllDonateHistoryWithPostId = async (
    donationId: string,
  paginationOptions: IPaginationOptions,
): Promise<IDonateHistory[] | null> => {   
    
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions);
  

    const sortConditions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }


    const result = await DonationHistory.find({donationPost: donationId})
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate('user')
        .populate('donationPost')
        .lean() as IDonateHistory[];   


    if(!result){
        throw new ApiError(httpStatus.NOT_FOUND, 'No history found')
    }
    return result;
};

export const DonateHistoryService = {
  createDonateHistory,
  getAllDonateHistory,
  getSingleDonateHistory,
  getAllDonateHistoryWithPostId,
};
