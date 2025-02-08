import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import type { IAuthDTO } from '../dtos/AuthDto';
import type {
  ICreateTransactionRequest,
  ITransactionNotifRequest,
} from '../dtos/TransactionDto';
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

  static async createTransaction(
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

      const response = await TransactionService.createTransaction(request);

      successResponse(res, 201, 'Transaction created successfully', response);
    } catch (error) {
      next(error);
    }
  }

  static async transactionNotif(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request = {
        transactionId: req.body.order_id,
        transactionStatus: req.body.transaction_status,
        fraudStatus: req.body.fraud_status,
        statusCode: req.body.status_code,
        grossAmount: req.body.gross_amount,
        paymentType: req.body.payment_type,
        signatureKey: req.body.signature_key,
      } as ITransactionNotifRequest;

      await TransactionService.transactionNotif(request);

      successResponse(
        res,
        StatusCodes.OK,
        'Transaction notification received successfully',
      );
    } catch (error) {
      next(error);
    }
  }
}
