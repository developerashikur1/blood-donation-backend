import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ProductRoutes } from '../modules/products/product.route';
import { SalesRoutes } from '../modules/salseHistory/salseHistory.route';
import { DonationRoutes } from '../modules/donations/donation.route';
import { DonateHistoryRoutes } from '../modules/donateHistory/donateHistory.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/donations',
    route: DonationRoutes,
  },
  {
    path: '/donate-history',
    route: DonateHistoryRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
