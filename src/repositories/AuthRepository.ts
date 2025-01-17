import type { Prisma } from '@prisma/client';

import { db } from '../configs/database';

export class AuthMethodRepository {
  static async create(
    userId: string,
    provider: string,
    providerId: string,
    tx: Prisma.TransactionClient = db,
  ) {
    return tx.authMethod.create({
      data: {
        userId: userId,
        provider: provider,
        providerId: providerId,
      },
    });
  }

  static async findByProviderId(
    providerId: string,
    tx: Prisma.TransactionClient = db,
  ) {
    return tx.authMethod.findUnique({
      where: {
        providerId: providerId,
      },
    });
  }
}
