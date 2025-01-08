import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

import { ResponseError } from '../error/ResponseError';

export const successResponse = (
  res: Response,
  code: number,
  message: string,
  data?: any,
): void => {
  if (data === undefined) {
    res.status(code).json({
      resultCode: code,
      resultMessage: message,
    });
  } else {
    res.status(code).json({
      resultCode: code,
      resultMessage: message,
      data: data,
    });
  }
};

export const errorResponse = (res: Response, error: Error): void => {
  if (error instanceof ResponseError) {
    res.status(error.status).json({
      errorCode: error.status,
      errorMessage: error.message,
    });
  } else if (error instanceof ZodError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errorCode: StatusCodes.BAD_REQUEST,
      errorMessage: error.errors[0].message,
    });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errorCode: StatusCodes.INTERNAL_SERVER_ERROR,
      errorMessage: 'Internal Server Error',
    });
  }
};
