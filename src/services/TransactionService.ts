import { db as database } from '../configs/database';
import { UserState } from '../constants';
import type {
  ICreateTransactionRequest,
  ICreateTransactionResponse,
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
import { Validator } from '../utils/validator';
import { TransactionValidation } from '../validations';

export class TransactionService {
  static async createTransaction(
    request: ICreateTransactionRequest,
  ): Promise<ICreateTransactionResponse> {
    const validData = Validator.validate(TransactionValidation.CREATE, request);

    if (validData.couponPackageId && validData.membershipTypeId) {
      throw new ResponseError(400, 'Invalid Transaction Request');
    }

    const user = await UserRepository.findById(request.userId);

    if (!user) {
      throw new ResponseError(404, 'User not found');
    }

    let transactionsItems = [];

    if (validData.couponPackageId) {
      const couponPackage = await CouponPackageRepository.findById(
        validData.couponPackageId,
      );

      if (!couponPackage) {
        throw new ResponseError(404, 'Coupon package not found');
      }

      if (validData.userState !== UserState.BUYER) {
        throw new ResponseError(400, 'You are not a buyer');
      }

      transactionsItems.push({
        amount: couponPackage.price,
        couponPackageId: couponPackage.id,
      });
    } else if (validData.membershipTypeId) {
      const userMembership = await MembershipRepository.findByUserId(user.id);

      if (userMembership.startDate < userMembership.endDate) {
        throw new ResponseError(400, 'You already have an active membership');
      }

      const membershipType = await MembershipTypeRepository.findById(
        validData.membershipTypeId,
      );

      if (!membershipType) {
        throw new ResponseError(404, 'Membership type not found');
      }

      if (validData.userState !== UserState.SELLER) {
        throw new ResponseError(400, 'You are not a seller');
      }

      transactionsItems.push({
        amount: membershipType.price,
        membershipTypeId: membershipType.id,
      });
    } else {
      throw new ResponseError(400, 'Invalid Transaction Request');
    }

    const exchangeRate = 16000;

    const totalAmount = transactionsItems.reduce(
      (accumulator, item) => accumulator + item.amount,
      0,
    );

    const grossAmount = totalAmount * exchangeRate;

    console.log('grossAmount', grossAmount);

    const db = database;

    try {
      const newTransaction = await db.$transaction(async (tx: any) => {
        const createdTransaction = await TransactionRepository.create(
          user.id,
          user.username,
          user.email,
          totalAmount,
          tx,
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
}
