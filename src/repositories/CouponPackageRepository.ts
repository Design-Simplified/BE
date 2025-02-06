import type { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { db } from '../configs/database';

export class CouponPackageRepository {
  static async create(
    data: Prisma.CouponPackageCreateInput,
    tx: Prisma.TransactionClient = db,
  ) {
    const id = `CP-${uuidv4()}`;

    return tx.couponPackage.create({
      data: {
        id: id,
        ...data,
      },
    });
  }

  static async findById(id: string, tx: Prisma.TransactionClient = db) {
    return tx.couponPackage.findUnique({
      where: {
        id: id,
      },
    });
  }
}
