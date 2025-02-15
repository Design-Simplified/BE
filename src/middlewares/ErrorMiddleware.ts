import type { Request, Response, NextFunction } from 'express';

import { errorResponse } from '../utils/api-response';

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    return next(error);
  }

  errorResponse(res, error);
};
