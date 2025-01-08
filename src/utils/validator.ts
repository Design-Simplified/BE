import type { ZodType } from 'zod';

export class Validator {
  static validate<T>(schema: ZodType, data: T): T {
    return schema.parse(data);
  }
}
