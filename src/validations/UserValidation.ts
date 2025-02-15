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

  static readonly GET = z.object({
    userId: z.string(),
    state: z.string(),
    role: z.number(),
  });

  static readonly UPDATE = z.object({
    userId: z.string(),
    username: z
      .string({
        invalid_type_error: 'Username is not valid',
        required_error: 'Username is required',
      })
      .max(255, 'Username must not exceed 255 characters')
      .optional(),
  });
}
