import type { Prisma } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { db } from '../configs/database';

export class TransactionItemRepository {
  static async createMany(
    transactionId: string,
    items: {
      amount: number;
      couponPackageId?: number | null;
      membershipTypeId?: number | null;
    }[],
    tx: Prisma.TransactionClient = db,
  ) {
    const data = items.map(item => ({
      id: `TXI-${uuid()}`,
      transactionId: transactionId,
      amount: item.amount,
      couponPackageId: item.couponPackageId ?? null,
      membershipTypeId: item.membershipTypeId ?? null,
    }));

    return tx.transactionItem.createMany({
      data,
    });
  }

  static async findById(id: string, tx: Prisma.TransactionClient = db) {
    return tx.transactionItem.findUnique({
      where: {
        id: id,
      },
      include: {
        couponPackage: true,
        membershipType: true,
      },
    });
  }

  static async update(
    id: string,
    data: Prisma.TransactionItemUpdateInput,
    tx: Prisma.TransactionClient = db,
  ) {
    return tx.transactionItem.update({
      where: {
        id: id,
      },
      data: data,
    });
  }
}
