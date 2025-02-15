import { Router } from 'express';

import { UserController } from '../controllers/UserController';
import { mainAuthMiddleware } from '../middlewares/MainAuthMiddleware';

export const userRoute: Router = Router();

userRoute.get('/me', mainAuthMiddleware, UserController.me);
userRoute.put('/update/me', mainAuthMiddleware, UserController.updateUser);
userRoute.delete('/delete/me', mainAuthMiddleware, UserController.deleteUser);
