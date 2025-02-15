import type { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
// eslint-disable-next-line
import multer, { FileFilterCallback } from 'multer';

import { ResponseError } from '../error/ResponseError';

const dir = process.env.UPLOADS_PATH as string;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, dir); // Direktori penyimpanan file
  },
  filename: (req, file, callback) => {
    const filename = `${Date.now()}-${file.originalname}`; // Nama file yang diupload
    callback(null, filename);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg']; // Tipe file yang diizinkan

  if (allowedMimeTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(
      new ResponseError(
        StatusCodes.BAD_REQUEST,
        'Tipe file yang didukung hanya jpg, jpeg, dan png',
      ),
    );
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5, // Contoh: 5MB maksimal ukuran file
};

export const upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter,
});
