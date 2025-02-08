import { Router } from 'express';

import { UserState } from '../constants';
import { CouponPackageController } from '../controllers';
import { mainAuthMiddleware } from '../middlewares/MainAuthMiddleware';
import { userStateMiddleware } from '../middlewares/UserStateMiddleware';

export const couponPackageRoute: Router = Router();

couponPackageRoute.get(
  '/',
  mainAuthMiddleware,
  userStateMiddleware(UserState.BUYER),
  CouponPackageController.getAllCouponPackages,
);
