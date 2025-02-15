import { Router } from 'express';

import { UserController } from '../controllers/UserController';
import { mainAuthMiddleware } from '../middlewares/MainAuthMiddleware';
import { uploadMiddleware } from '../middlewares/UploadMiddleware';

export const userRoute: Router = Router();

userRoute.get('/me', mainAuthMiddleware, UserController.me);
userRoute.put('/update/me', mainAuthMiddleware, UserController.updateUser);
userRoute.put(
  '/update/me/photo-profile',
  mainAuthMiddleware,
  uploadMiddleware,
  UserController.updatePhotoProfile,
);
userRoute.delete('/delete/me', mainAuthMiddleware, UserController.deleteUser);
