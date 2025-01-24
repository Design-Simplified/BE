// eslint-disable-next-line
import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly LOGIN_WITH_EMAIL = z.object({
    email: z.string().email(),
    state: z.string(),
  });
}
