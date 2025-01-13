import type { Prisma } from '@prisma/client';

import { db } from '../configs/database';

export class UserRepository {
  static async create(
    username: string,
    email?: string,
    tx: Prisma.TransactionClient = db,
  ) {
    return tx.user.create({
      data: {
        email: email,
        username: username,
      },
    });
  }

  static async findByEmail(email: string, tx: Prisma.TransactionClient = db) {
    return tx.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  static async findById(id: string, tx: Prisma.TransactionClient = db) {
    return tx.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async update(
    id: string,
    data: any,
    tx: Prisma.TransactionClient = db,
  ) {
    return tx.user.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  static async delete(id: string, tx: Prisma.TransactionClient = db) {
    return tx.user.delete({
      where: {
        id: id,
      },
    });
  }
}