import type { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
// eslint-disable-next-line
import multer, { FileFilterCallback } from 'multer';

import { ResponseError } from '../error/ResponseError';

const dir = process.env.UPLOADS_PATH as string;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, dir);
  },
  filename: (req, file, callback) => {
    const filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(
      new ResponseError(
        StatusCodes.BAD_REQUEST,
        'Invalid file type. Only jpg, jpeg, and png image files are allowed',
      ),
    );
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

export const upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter,
});
