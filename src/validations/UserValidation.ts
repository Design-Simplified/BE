// eslint-disable-next-line
import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly LOGIN_WITH_EMAIL = z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    state: z.string(),
  });
}
