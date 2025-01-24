/* eslint-disable */
import { StatusCodes } from 'http-status-codes';

import { ResponseError } from '../error/ResponseError';
import { HealthRepository } from '../repositories';

export class HealthService {
  static async getHealth(): Promise<void> {
    try {
      await HealthRepository.dbCheck();
    } catch (error) {
      throw new ResponseError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Database is not connected',
      );
    }

    try {
      await HealthRepository.redisCheck();
    } catch (error) {
      throw new ResponseError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Redis is not connected',
      );
    }
  }
}
