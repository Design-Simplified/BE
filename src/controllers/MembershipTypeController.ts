import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { MembershipTypeService } from '../services';
import { successResponse } from '../utils/api-response';

export class MembershipTypeController {
  static async getAllMembershipTypes(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const response = await MembershipTypeService.getAllMembershipTypes();

      if (response.membershipTypes.length === 0) {
        successResponse(
          res,
          StatusCodes.NO_CONTENT,
          'No membership types found',
          response,
        );
      }

      successResponse(res, StatusCodes.OK, 'Membership types found', response);
    } catch (error) {
      next(error);
    }
  }
}
