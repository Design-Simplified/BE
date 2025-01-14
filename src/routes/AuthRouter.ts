import { Router } from 'express';

import { AuthController } from '../controllers';
import { GoogleAuthMiddleware } from '../middlewares/GoogleAuthMiddleware';

export const authRoute: Router = Router();

authRoute.get('/google/buyer', GoogleAuthMiddleware.concentBuyer);
authRoute.get('/google/seller', GoogleAuthMiddleware.concentSeller);
authRoute.get('/local/google/buyer', GoogleAuthMiddleware.concentBuyerLocal);
authRoute.get('/local/google/seller', GoogleAuthMiddleware.concentSellerLocal);
authRoute.get(
  '/google/callback/buyer',
  GoogleAuthMiddleware.callbackBuyer,
  AuthController.loginWithGoogle,
);
authRoute.get(
  '/google/callback/seller',
  GoogleAuthMiddleware.callbackSeller,
  AuthController.loginWithGoogle,
);
authRoute.get(
  '/local/google/callback/buyer',
  GoogleAuthMiddleware.callbackBuyerLocal,
  AuthController.loginWithGoogleLocal,
);
authRoute.get(
  '/local/google/callback/seller',
  GoogleAuthMiddleware.callbackSellerLocal,
  AuthController.loginWithGoogleLocal,
);
