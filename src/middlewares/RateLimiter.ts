/* eslint-disable */
import type { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { StatusCodes } from 'http-status-codes';

import { Env } from '../constants';
import { ResponseError } from '../error/ResponseError';

export class RateLimiter {
  private static getLimiter(options: any) {
    if (process.env.NODE_ENV === Env.DEVELOPMENT) {
      return (req: Request, res: Response, next: NextFunction) => next();
    }

    return rateLimit(options);
  }

  static readonly createTransactionLimiter = RateLimiter.getLimiter({
    windowMs: 60 * 1000,
    max: 5,
    handler: (req: Request, res: Response) => {
      throw new ResponseError(
        StatusCodes.TOO_MANY_REQUESTS,
        'Too many requests, please try again after a minute',
      );
    },
  });

  static readonly sendVerificationEmailLimiter = RateLimiter.getLimiter({
    windowMs: 60 * 1000,
    max: 1,
    handler: (req: Request, res: Response) => {
      throw new ResponseError(
        StatusCodes.TOO_MANY_REQUESTS,
        'Too many requests, please try again after a minute',
      );
    },
  });
}
