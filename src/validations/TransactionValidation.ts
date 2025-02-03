// eslint-disable-next-line
import { z, ZodType } from 'zod';

export class TransactionValidation {
  static readonly CREATE: ZodType = z.object({
    userId: z.string(),
    username: z.string(),
    userState: z.string(),
    userEmail: z.string().email().optional().nullish(),
    couponPackageId: z.number().optional().nullish(),
    membershipTypeId: z.number().optional().nullish(),
  });

  static readonly NOTIF: ZodType = z.object({
    transactionId: z.string(),
    transactionStatus: z.string(),
    fraudStatus: z.string(),
    statusCode: z.string(),
    grossAmount: z.string(),
    paymentType: z.string(),
  });
}
