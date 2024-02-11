import { Model } from "mongoose";

export type IDonationPost = {
    title: string;
    image: string;
    color: string;
    description: string;
    quantityOfMoney: number;
    category: string;
}

export type DonationModel = Model<IDonationPost, Record<string, unknown>>;

export type IDonationPostFilters= {
    searchTerm?: string;
}
