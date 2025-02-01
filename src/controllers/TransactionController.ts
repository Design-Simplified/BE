import type { Request, Response, NextFunction } from 'express';

import type { IAuthDTO } from '../dtos/AuthDto';
import type { ICreateTransactionRequest } from '../dtos/TransactionDto';
import { TransactionService } from '../services';
import { successResponse } from '../utils/api-response';

export class TransactionController {
  static async createTransactionLocal(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const authRequest = req as IAuthDTO;

      const request = {
        userId: authRequest.user.userId,
        username: authRequest.user.username,
        userState: authRequest.user.state,
        userEmail: authRequest.user.email ? authRequest.user.email : null,
        ...req.body,
      } as ICreateTransactionRequest;

      const response = await TransactionService.createTransactionLocal(request);

      successResponse(res, 201, 'Transaction created successfully', response);
    } catch (error) {
      next(error);
    }
  }
}
