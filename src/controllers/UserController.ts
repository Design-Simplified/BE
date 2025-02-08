import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import type { IAuthDTO } from '../dtos/AuthDto';
import type { IDeleteUserRequest } from '../dtos/UserDto';
import { UserService } from '../services';
import { successResponse } from '../utils/api-response';

export class UserController {
  static async me(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const authRequest = req as IAuthDTO;

      const response = {
        id: authRequest.user.userId,
        username: authRequest.user.username,
        email: authRequest.user.email,
        state: authRequest.user.state,
        role: authRequest.user.role,
      };
      successResponse(res, StatusCodes.OK, 'Success get user data', response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const authRequest = req as IAuthDTO;

      const request = {
        userId: authRequest.user.userId,
      } as IDeleteUserRequest;

      await UserService.deleteUser(request);

      successResponse(res, StatusCodes.OK, 'User deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
