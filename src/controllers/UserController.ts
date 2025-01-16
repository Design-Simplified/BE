import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import type { IAuthDTO } from '../dtos/AuthDto';
import { successResponse } from '../utils/api-response';

export class UserController {
  static async me(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request = req as IAuthDTO;
      successResponse(
        res,
        StatusCodes.OK,
        'Success get user data',
        request.user,
      );
    } catch (error) {
      next(error);
    }
  }
}
