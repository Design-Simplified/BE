import crypto from 'crypto';
import { StatusCodes } from 'http-status-codes';

import { db as database } from '../configs/database';
import { appLogger } from '../configs/logger';
import { MIDTRANS_SECRET } from '../constants';
import { PaymentStatus } from '../constants/payment-constants';
import { ResponseError } from '../error/ResponseError';
import {
  MembershipRepository,
  MembershipTypeRepository,
  CouponPackageRepository,
  CouponWalletRepository,
  TransactionItemRepository,
  TransactionRepository,
} from '../repositories';

export class TransactionUtils {
  static async updateUserRights(transaction: any, tx: any): Promise<void> {
    const user = await MembershipRepository.findByUserId(
      transaction.userId,
      tx,
    );

    if (!user) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'User not found');
    }

    const transactoinItems =
      await TransactionItemRepository.findByTransactionId(transaction.id, tx);
    const firstItem = transactoinItems[0];

    if (transactoinItems.length === 0) {
      throw new ResponseError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
      );
    }

    if (transactoinItems.length > 1) {
      throw new ResponseError(StatusCodes.BAD_REQUEST, 'Belum Saatnya');
    }

    if (firstItem.couponPackageId) {
      const couponPackage = await CouponPackageRepository.findById(
        firstItem.couponPackageId,
        tx,
      );

      if (!couponPackage) {
        throw new ResponseError(
          StatusCodes.NOT_FOUND,
          'Coupon package not found',
        );
      }

      await CouponWalletRepository.update(
        transaction.userId,
        {
          balance: couponPackage.total_coupons,
        },
        tx,
      );
    } else if (firstItem.membershipTypeId) {
      const membershipType = await MembershipTypeRepository.findById(
        firstItem.membershipTypeId,
        tx,
      );

      if (!membershipType) {
        throw new ResponseError(
          StatusCodes.NOT_FOUND,
          'Membership type not found',
        );
      }

      const duration = membershipType.duration_in_day;
      const endDate = new Date();

      endDate.setDate(endDate.getDate() + duration);

      await MembershipRepository.update(
        transaction.userId,
        {
          membershipType: { connect: { id: membershipType.id } },
          startDate: new Date(),
          endDate: endDate,
        },
        tx,
      );
    } else {
      throw new ResponseError(
        StatusCodes.BAD_REQUEST,
        'Invalid Transaction Request',
      );
    }
  }

  static async updateTransactionStatus(
    transaction: any,
    data: any,
    tx: any,
  ): Promise<void> {
    const hash = crypto
      .createHash('sha512')
      .update(
        `${transaction.id}${data.StatusCode}${data.grossAmount}${MIDTRANS_SECRET.MIDTRANS_SERVER_KEY}`,
      )
      .digest('hex');

    if (data.signature_key !== hash) {
      throw new ResponseError(StatusCodes.BAD_REQUEST, 'Invalid Signature Key');
    }

    let responseData = null;
    let transactionStatus = data.transactionStatus;
    let fraudStatus = data.fraudStatus;

    if (transactionStatus == 'capture') {
      if (fraudStatus == 'accept') {
        const updatedTransaction = await TransactionRepository.update(
          transaction.id,
          {
            status: PaymentStatus.PAID,
            paymentMethod: data.paymentType,
          },
          tx,
        );
        await TransactionUtils.updateUserRights(updatedTransaction, tx);
        responseData = updatedTransaction;
      }
    } else if (transactionStatus == 'settlement') {
      const updatedTransaction = await TransactionRepository.update(
        transaction.id,
        {
          status: PaymentStatus.PAID,
          paymentMethod: data.paymentType,
        },
        tx,
      );
      await TransactionUtils.updateUserRights(updatedTransaction, tx);
      responseData = updatedTransaction;
    } else if (
      transactionStatus == 'cancel' ||
      transactionStatus == 'deny' ||
      transactionStatus == 'expire'
    ) {
      const updatedTransaction = await TransactionRepository.update(
        transaction.id,
        {
          status: PaymentStatus.CANCELLED,
        },
        tx,
      );
      responseData = updatedTransaction;
    } else if (transactionStatus == 'pending') {
      const updatedTransaction = await TransactionRepository.update(
        transaction.id,
        {
          status: PaymentStatus.PENDING,
        },
        tx,
      );
      responseData = updatedTransaction;
    }

    appLogger.debug('Transaction Status Updated', responseData);
  }

  static async actionAfterTransaction(
    transaction: any,
    data: any,
  ): Promise<void> {
    const db = database;

    try {
      await db.$transaction(async (tx: any) => {
        await TransactionUtils.updateTransactionStatus(transaction, data, tx);
      });
    } catch (error) {
      throw error;
    }
  }
}
