import type { Prisma } from '@prisma/client';

import { db } from '../configs/database';

// model AuthMethod {
//   id         Int      @id @default(autoincrement()) @map("id")
//   userId     String   @map("user_id")
//   provider   String   @map("provider")
//   providerId String   @map("provider_id")
//   createdAt  DateTime @default(now()) @map("created_at")
//   updatedAt  DateTime @updatedAt @map("updated_at")
//   user       User     @relation(fields: [userId], references: [id])

//   @@index([userId, provider])
//   @@map("auth_methods")
// }

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
