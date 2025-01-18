import type { Prisma } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { db } from '../configs/database';

export class CouponWalletRepository {
  static async create(userId: string, tx: Prisma.TransactionClient = db) {
    const id = `CW-${uuid()}`;

    return tx.couponWallet.create({
      data: {
        id: id,
        userId: userId,
      },
    });
  }

  static async findById(id: string, tx: Prisma.TransactionClient = db) {
    return tx.couponWallet.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async update(
    id: string,
    data: Prisma.CouponWalletUpdateInput,
    tx: Prisma.TransactionClient = db,
  ) {
    return tx.couponWallet.update({
      where: {
        id: id,
      },
      data: data,
    });
  }
}
