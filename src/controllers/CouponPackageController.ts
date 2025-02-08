import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CouponPackageService } from '../services';
import { successResponse } from '../utils/api-response';

export class CouponPackageController {
  static async getAllCouponPackages(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const response = await CouponPackageService.getAllCouponPackages();

      if (response.couponPackages.length === 0) {
        successResponse(
          res,
          StatusCodes.NO_CONTENT,
          'No coupon packages found',
          response,
        );
      }

      successResponse(res, StatusCodes.OK, 'Coupon packages found', response);
    } catch (error) {
      next(error);
    }
  }
}
