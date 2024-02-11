import express from 'express';
import { DonationController } from './donations.controller';

const router = express.Router();

// router.patch('/:id', DonationController.createDonation);
router.delete('/:id', DonationController.deleteDonation);
router.patch('/:id', DonationController.updateDonation);
router.get('/:id', DonationController.getSingleDonation);
router.get('/', DonationController.getAllDonations);

router.post('/create-donation', DonationController.createDonation);

export const DonationRoutes = router;
