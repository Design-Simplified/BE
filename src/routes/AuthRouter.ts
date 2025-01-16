import { Router } from 'express';

import { AuthController } from '../controllers';
import { FacebookAuthMiddleware } from '../middlewares/FacebookAuthMiddleware';
import { GoogleAuthMiddleware } from '../middlewares/GoogleAuthMiddleware';
import { mainAuthMiddleware } from '../middlewares/MainAuthMiddleware';

export const authRoute: Router = Router();

authRoute.get('/google/buyer', GoogleAuthMiddleware.concentBuyer);
authRoute.get('/google/seller', GoogleAuthMiddleware.concentSeller);
authRoute.get('/local/google/buyer', GoogleAuthMiddleware.concentBuyerLocal);
authRoute.get('/local/google/seller', GoogleAuthMiddleware.concentSellerLocal);
authRoute.get('/facebook/buyer', FacebookAuthMiddleware.concentBuyer);
authRoute.get('/facebook/seller', FacebookAuthMiddleware.concentSeller);
authRoute.get(
  '/local/facebook/buyer',
  FacebookAuthMiddleware.concentBuyerLocal,
);
authRoute.get(
  '/local/facebook/seller',
  FacebookAuthMiddleware.concentSellerLocal,
);
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
authRoute.get(
  '/facebook/callback/buyer',
  FacebookAuthMiddleware.callbackBuyer,
  AuthController.loginWithFacebook,
);
authRoute.get(
  '/facebook/callback/seller',
  FacebookAuthMiddleware.callbackSeller,
  AuthController.loginWithFacebook,
);
authRoute.get(
  '/local/facebook/callback/buyer',
  FacebookAuthMiddleware.callbackBuyerLocal,
  AuthController.loginWithFacebookLocal,
);
authRoute.get(
  '/local/facebook/callback/seller',
  FacebookAuthMiddleware.callbackSellerLocal,
  AuthController.loginWithFacebookLocal,
);
authRoute.post('/logout', mainAuthMiddleware, AuthController.logout);
