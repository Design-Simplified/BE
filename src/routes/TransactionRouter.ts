import { Router } from 'express';

import { TransactionController } from '../controllers';
import { mainAuthMiddleware } from '../middlewares/MainAuthMiddleware';

export const transactionRoute: Router = Router();

transactionRoute.post(
  '/local',
  mainAuthMiddleware,
  TransactionController.createTransactionLocal,
);
transactionRoute.post(
  '/',
  mainAuthMiddleware,
  TransactionController.createTransaction,
);
