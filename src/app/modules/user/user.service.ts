import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { TUser } from './user.interface';
import { User } from './user.model';
import { ENUM_USER_ROLE } from '../../../enums/user';

const createUser = async (user: TUser): Promise<TUser | null> => {
    
    if(!user.role){
        user.role = ENUM_USER_ROLE.USER;
    }
    
 const createUser = await User.create(user);
 
  if (!createUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create');
  }
  return createUser;
};

const getAllUsers = async (): Promise<TUser[]> => {
  const getAllUsers = await User.find({});
    console.log(getAllUsers);

  if (!getAllUsers) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create');
  }
  return getAllUsers;
};

const getUserProfile = async (payload: string): Promise<TUser> => {
    // const getUserProfile = User.isUserExist(payload)
  const getUserProfile = await User.findOne({email: payload});


  if (!getUserProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return getUserProfile;
};

export const UserService = {
  createUser,
  getAllUsers,
  getUserProfile,
};
