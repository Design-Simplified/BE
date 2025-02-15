import type { NextFunction, Request, Response } from 'express';

import { upload } from '../configs/multer';
import { errorResponse } from '../utils/api-response';

const uploadSingle = upload.single('image');

export const uploadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  uploadSingle(req, res, (error: any) => {
    if (error) {
      errorResponse(res, error);
    } else {
      next();
    }
  });
};
