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
}
