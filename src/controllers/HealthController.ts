import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { HealthService } from '../services';
import { successResponse } from '../utils/api-response';

export class HealthController {
  static async getHealth(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await HealthService.getHealth();
      successResponse(res, StatusCodes.OK, 'OK!');
    } catch (error) {
      next(error);
    }
  }
}
