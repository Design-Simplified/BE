import { Router } from 'express';

import { TransactionController } from '../controllers';
import { mainAuthMiddleware } from '../middlewares/MainAuthMiddleware';
import { RateLimiter } from '../middlewares/RateLimiter';

export const transactionRoute: Router = Router();

transactionRoute.post(
  '/local',
  RateLimiter.createTransactionLimiter,
  mainAuthMiddleware,
  TransactionController.createTransactionLocal,
);
transactionRoute.post(
  '/',
  RateLimiter.createTransactionLimiter,
  mainAuthMiddleware,
  TransactionController.createTransaction,
);
transactionRoute.post('/notification', TransactionController.transactionNotif);
