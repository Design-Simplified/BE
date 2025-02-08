import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import type { IAuthDTO } from '../dtos/AuthDto';
import { ResponseError } from '../error/ResponseError';

export const userStateMiddleware =
  (allowedState: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    const state = (req as IAuthDTO).user.state;

    if (state !== allowedState) {
      return next(
        new ResponseError(
          StatusCodes.FORBIDDEN,
          `You are not a ${allowedState}`,
        ),
      );
    }

    next();
  };
