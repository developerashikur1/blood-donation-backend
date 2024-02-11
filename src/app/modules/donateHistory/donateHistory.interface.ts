import { Model, Types } from 'mongoose';
import { IDonationPost } from '../donations/donations.interface';
import { TUser } from '../user/user.interface';

export type IDonateHistory = {
  user: Types.ObjectId | TUser;
  donationPost: Types.ObjectId | IDonationPost;
};

export type DonationHistory = Model<IDonateHistory, Record<string, unknown>>;
