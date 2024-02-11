import { Schema, model } from 'mongoose';
import { DonationModel } from '../donations/donations.interface';
import { IDonateHistory } from './donateHistory.interface';

const donationHistorySchema = new Schema<IDonateHistory>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    donationPost: {
      type: Schema.Types.ObjectId,
      ref: 'Donations',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const DonationHistory = model<IDonateHistory, DonationModel>(
  'DonationHistory',
  donationHistorySchema,
);
