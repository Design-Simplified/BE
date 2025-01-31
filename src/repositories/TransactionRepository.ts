import type { Prisma } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { db } from '../configs/database';
import { PaymentStatus } from '../constants/payment-constants';

export class TransactionRepository {
  static async create(
    userId: string,
    userName: string,
    userEmail: string,
    totalAmount: number,
    tx: Prisma.TransactionClient = db,
    snapToken: string = null,
    snapUrl: string = null,
  ) {
    const id = `TX-${uuid()}`;

    return tx.transaction.create({
      data: {
        id: id,
        userId: userId,
        userName: userName,
        userEmail: userEmail,
        totalAmount: totalAmount,
        snapToken: snapToken,
        snapUrl: snapUrl,
        status: PaymentStatus.PENDING,
      },
    });
  }

  static async findById(id: string, tx: Prisma.TransactionClient = db) {
    return tx.transaction.findUnique({
      where: {
        id: id,
      },
      include: {
        transactionItems: {
          include: {
            couponPackage: true,
            membershipType: true,
          },
        },
      },
    });
  }

  static async update(
    id: string,
    data: Prisma.TransactionUpdateInput,
    tx: Prisma.TransactionClient = db,
  ) {
    return tx.transaction.update({
      where: {
        id: id,
      },
      data: data,
    });
  }
}
