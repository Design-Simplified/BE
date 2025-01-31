import type { Prisma } from '@prisma/client';

import { db } from '../configs/database';

export class CouponPackageRepository {
  static async findById(id: number, tx: Prisma.TransactionClient = db) {
    return tx.couponPackage.findUnique({
      where: {
        id: id,
      },
    });
  }
}
