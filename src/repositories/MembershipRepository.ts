import type { Prisma } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { db } from '../configs/database';

export class MembershipRepository {
  static async create(userId: string, tx: Prisma.TransactionClient = db) {
    const id = `MBS-${uuid()}`;

    return tx.membership.create({
      data: {
        id: id,
        userId: userId,
      },
    });
  }

  static async update(
    id: string,
    data: Prisma.MembershipUpdateInput,
    tx: Prisma.TransactionClient = db,
  ) {
    return tx.membership.update({
      where: {
        id: id,
      },
      data: data,
    });
  }
}
