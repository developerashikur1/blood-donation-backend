import { Schema, model } from 'mongoose';
import { DonationModel, IDonationPost } from './donations.interface';

const donationSchema = new Schema<IDonationPost>(
  {
    title: {
      type: String,
      required: true,
    },
    quantityOfMoney: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Donations = model<IDonationPost, DonationModel>(
  'Donations',
  donationSchema,
);
