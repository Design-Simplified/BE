import type { Request, Response, NextFunction } from 'express';

import { passport } from '../configs/passport';
import type { IAuthDTO } from '../dtos/AuthDto';
import { ResponseError } from '../error/ResponseError';

export const mainAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (error: Error, user: any) => {
      if (error) {
        return next(error);
      }

      if (!user) {
        return next(new ResponseError(401, 'Unauthorized!'));
      }

      req.user = user as IAuthDTO;

      next();
    },
  )(req, res, next);
};
