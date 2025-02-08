import { Router } from 'express';

import { UserState } from '../constants';
import { MembershipTypeController } from '../controllers';
import { mainAuthMiddleware } from '../middlewares/MainAuthMiddleware';
import { userStateMiddleware } from '../middlewares/UserStateMiddleware';

export const membershipTypeRoute: Router = Router();

membershipTypeRoute.get(
  '/',
  mainAuthMiddleware,
  userStateMiddleware(UserState.SELLER),
  MembershipTypeController.getAllMembershipTypes,
);
