import { StatusCodes } from 'http-status-codes';
import { v4 as uuid } from 'uuid';

import { db as database } from '../configs/database';
import { UserState } from '../constants';
import type {
  ICreateTransactionRequest,
  ICreateTransactionResponse,
  ITransactionNotifRequest,
} from '../dtos/TransactionDto';
import { ResponseError } from '../error/ResponseError';
import {
  UserRepository,
  MembershipRepository,
  TransactionItemRepository,
  TransactionRepository,
  CouponPackageRepository,
  MembershipTypeRepository,
} from '../repositories';
import { PaymentUtils } from '../utils/payment-utils';
import { TransactionUtils } from '../utils/transaction-utils';
import { Validator } from '../utils/validator';
import { TransactionValidation } from '../validations';

export class TransactionService {
  static async createTransactionLocal(
    request: ICreateTransactionRequest,
  ): Promise<ICreateTransactionResponse> {
    const validData = Validator.validate(TransactionValidation.CREATE, request);

    if (validData.couponPackageId && validData.membershipTypeId) {
      throw new ResponseError(
        StatusCodes.BAD_GATEWAY,
        'Invalid Transaction Request',
      );
    }

    const user = await UserRepository.findById(request.userId);

    if (!user) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'User not found');
    }

    let transactionsItems = [];

    if (validData.couponPackageId) {
      const couponPackage = await CouponPackageRepository.findById(
        validData.couponPackageId,
      );

      if (!couponPackage) {
        throw new ResponseError(
          StatusCodes.NOT_FOUND,
          'Coupon package not found',
        );
      }

      if (validData.userState !== UserState.BUYER) {
        throw new ResponseError(StatusCodes.BAD_GATEWAY, 'You are not a buyer');
      }

      transactionsItems.push({
        amount: couponPackage.price,
        couponPackageId: couponPackage.id,
        name: couponPackage.name,
      });
    } else if (validData.membershipTypeId) {
      const userMembership = await MembershipRepository.findByUserId(user.id);

      if (userMembership.startDate < userMembership.endDate) {
        throw new ResponseError(
          StatusCodes.BAD_GATEWAY,
          'You already have an active membership',
        );
      }

      const membershipType = await MembershipTypeRepository.findById(
        validData.membershipTypeId,
      );

      if (!membershipType) {
        throw new ResponseError(
          StatusCodes.NOT_FOUND,
          'Membership type not found',
        );
      }

      if (validData.userState !== UserState.SELLER) {
        throw new ResponseError(
          StatusCodes.BAD_GATEWAY,
          'You are not a seller',
        );
      }

      transactionsItems.push({
        amount: membershipType.price,
        membershipTypeId: membershipType.id,
        name: membershipType.name,
      });
    } else {
      throw new ResponseError(
        StatusCodes.BAD_GATEWAY,
        'Invalid Transaction Request',
      );
    }

    const exchangeRate = 16000;

    const totalAmount = transactionsItems.reduce(
      (accumulator, item) => accumulator + item.amount,
      0,
    );

    const transactionId = `TX-${uuid()}`;

    const grossAmount = totalAmount * exchangeRate;

    const customerDetails = {
      name: user.username,
      email: user.email,
    };

    const payment = await PaymentUtils.sendToPaymentGatewayLocal(
      transactionId,
      grossAmount,
      transactionsItems,
      customerDetails,
      exchangeRate,
    );

    const db = database;

    try {
      const newTransaction = await db.$transaction(async (tx: any) => {
        const createdTransaction = await TransactionRepository.create(
          transactionId,
          user.id,
          user.username,
          user.email,
          totalAmount,
          tx,
          payment.token,
          payment.redirect_url,
        );

        await TransactionItemRepository.createMany(
          createdTransaction.id,
          transactionsItems,
          tx,
        );

        return createdTransaction;
      });

      return newTransaction;
    } catch (error) {
      throw error;
    }
  }

  static async createTransaction(
    request: ICreateTransactionRequest,
  ): Promise<ICreateTransactionResponse> {
    const validData = Validator.validate(TransactionValidation.CREATE, request);

    if (validData.couponPackageId && validData.membershipTypeId) {
      throw new ResponseError(
        StatusCodes.BAD_GATEWAY,
        'Invalid Transaction Request',
      );
    }

    const user = await UserRepository.findById(request.userId);

    if (!user) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'User not found');
    }

    let transactionsItems = [];

    if (validData.couponPackageId) {
      const couponPackage = await CouponPackageRepository.findById(
        validData.couponPackageId,
      );

      if (!couponPackage) {
        throw new ResponseError(
          StatusCodes.NOT_FOUND,
          'Coupon package not found',
        );
      }

      if (validData.userState !== UserState.BUYER) {
        throw new ResponseError(StatusCodes.BAD_GATEWAY, 'You are not a buyer');
      }

      transactionsItems.push({
        amount: couponPackage.price,
        couponPackageId: couponPackage.id,
        name: couponPackage.name,
      });
    } else if (validData.membershipTypeId) {
      const userMembership = await MembershipRepository.findByUserId(user.id);

      if (userMembership.startDate < userMembership.endDate) {
        throw new ResponseError(
          StatusCodes.BAD_GATEWAY,
          'You already have an active membership',
        );
      }

      const membershipType = await MembershipTypeRepository.findById(
        validData.membershipTypeId,
      );

      if (!membershipType) {
        throw new ResponseError(
          StatusCodes.NOT_FOUND,
          'Membership type not found',
        );
      }

      if (validData.userState !== UserState.SELLER) {
        throw new ResponseError(
          StatusCodes.BAD_GATEWAY,
          'You are not a seller',
        );
      }

      transactionsItems.push({
        amount: membershipType.price,
        membershipTypeId: membershipType.id,
        name: membershipType.name,
      });
    } else {
      throw new ResponseError(
        StatusCodes.BAD_GATEWAY,
        'Invalid Transaction Request',
      );
    }

    const exchangeRate = 16000;

    const totalAmount = transactionsItems.reduce(
      (accumulator, item) => accumulator + item.amount,
      0,
    );

    const transactionId = `TX-${uuid()}`;

    const grossAmount = totalAmount * exchangeRate;

    const customerDetails = {
      name: user.username,
      email: user.email,
    };

    const payment = await PaymentUtils.sendToPaymentGateway(
      transactionId,
      grossAmount,
      transactionsItems,
      customerDetails,
      exchangeRate,
    );

    const db = database;

    try {
      const newTransaction = await db.$transaction(async (tx: any) => {
        const createdTransaction = await TransactionRepository.create(
          transactionId,
          user.id,
          user.username,
          user.email,
          totalAmount,
          tx,
          payment.token,
          payment.redirect_url,
        );

        await TransactionItemRepository.createMany(
          createdTransaction.id,
          transactionsItems,
          tx,
        );

        return createdTransaction;
      });

      return newTransaction;
    } catch (error) {
      throw error;
    }
  }

  static async transactionNotif(
    request: ITransactionNotifRequest,
  ): Promise<void> {
    const validData = Validator.validate(TransactionValidation.NOTIF, request);

    TransactionRepository.findById(validData.transactionId).then(
      transaction => {
        if (transaction) {
          TransactionUtils.actionAfterTransaction(transaction, validData);
        }
      },
    );
  }
}
