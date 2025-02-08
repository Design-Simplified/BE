import type { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { db } from '../configs/database';

export class MembershipTypeRepository {
  static async create(
    data: Prisma.MembershipTypeCreateInput,
    tx: Prisma.TransactionClient = db,
  ) {
    const id = `MT-${uuidv4()}`;

    return tx.membershipType.create({
      data: {
        id: id,
        ...data,
      },
    });
  }

  static async findById(id: string, tx: Prisma.TransactionClient = db) {
    return tx.membershipType.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async findAll(tx: Prisma.TransactionClient = db) {
    return tx.membershipType.findMany();
  }
}
