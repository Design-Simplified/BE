import type { Prisma } from '@prisma/client';

import { db } from '../configs/database';

export class MembershipTypeRepository {
  static async findById(id: number, tx: Prisma.TransactionClient = db) {
    return tx.membershipType.findUnique({
      where: {
        id: id,
      },
    });
  }
}
