import { db } from '../configs/database';
import { redisClient } from '../configs/redis';

export class HealthRepository {
  static async dbCheck() {
    try {
      return await db.$queryRaw`SELECT 1`;
    } catch (error) {
      throw error;
    }
  }

  static async redisCheck() {
    try {
      await redisClient.ping();

      return redisClient.quit();
    } catch (error) {
      throw error;
    }
  }
}
