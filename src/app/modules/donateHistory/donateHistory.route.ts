import express from 'express';
import { DonateHistoryController } from './donateHistory.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get(
  '/single-donation/:id',
  DonateHistoryController.getAllDonateHistoryWithPostId,
  );

router.get(
  '/:id',
  DonateHistoryController.getSingleDonateHistory,
  );
  
  
router.post(
    '/',
  //   auth,
  DonateHistoryController.createDonateHistory,
);

router.get(
    '/',
    //   auth,
    auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  DonateHistoryController.getAllDonateHistory,
);

export const DonateHistoryRoutes = router;
