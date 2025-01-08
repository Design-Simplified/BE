import { db } from '../configs/database';

export class HealthRepository {
  static async check() {
    try {
      return await db.$queryRaw`SELECT 1`;
    } catch (error) {
      throw error;
    }
  }
}
