import { StatusCodes } from 'http-status-codes';

import { ResponseError } from '../error/ResponseError';
import { HealthRepository } from '../repositories';

export class HealthService {
  static async getHealth(): Promise<void> {
    const dbCheck = await HealthRepository.check();

    if (dbCheck instanceof Error) {
      throw new ResponseError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Database is not connected',
      );
    }
  }
}
