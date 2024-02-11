import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.signinZodSchema),
  AuthController.loginUser,
);
router.post(
  '/logout',
  AuthController.logoutUser,
);


export const AuthRoutes = router;