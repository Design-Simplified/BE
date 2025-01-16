import type { Request, Response, NextFunction } from 'express';

import { JWT_CONFIG, OAUTH_SECRET } from '../constants';
import type { IAuthDTO } from '../dtos/AuthDto';
import { AuthService } from '../services';
import { successResponse } from '../utils/api-response';

export class AuthController {
  static async loginWithGoogle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request = req as IAuthDTO;
      const response = await AuthService.loginWithGoogle(request);
      const accessTokenDuration = JWT_CONFIG.JWT_EXPIRES_IN;

      res.cookie('accessToken', response.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: accessTokenDuration,
      });

      res.redirect(OAUTH_SECRET.CLIENT_AUTH_REDIRECT_URL);
    } catch (error) {
      next(error);
    }
  }

  static async loginWithGoogleLocal(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request = req as IAuthDTO;
      const response = await AuthService.loginWithGoogle(request);
      const accessTokenDuration = JWT_CONFIG.JWT_EXPIRES_IN;

      res.cookie('accessToken', response.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: accessTokenDuration,
      });

      res.redirect(OAUTH_SECRET.CLIENT_AUTH_REDIRECT_URL_LOCAL);
    } catch (error) {
      next(error);
    }
  }

  static async loginWithFacebook(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request = req as IAuthDTO;
      const response = await AuthService.loginWithFacebook(request);
      const accessTokenDuration = JWT_CONFIG.JWT_EXPIRES_IN;

      res.cookie('accessToken', response.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: accessTokenDuration,
      });

      res.redirect(OAUTH_SECRET.CLIENT_AUTH_REDIRECT_URL);
    } catch (error) {
      next(error);
    }
  }

  static async loginWithFacebookLocal(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request = req as IAuthDTO;
      const response = await AuthService.loginWithFacebook(request);
      const accessTokenDuration = JWT_CONFIG.JWT_EXPIRES_IN;

      res.cookie('accessToken', response.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: accessTokenDuration,
      });

      console.log(OAUTH_SECRET.CLIENT_AUTH_REDIRECT_URL_LOCAL);

      res.redirect(OAUTH_SECRET.CLIENT_AUTH_REDIRECT_URL_LOCAL);
    } catch (error) {
      next(error);
    }
  }

  static async logout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      res.clearCookie('accessToken');
      successResponse(res, 200, 'Logout success');
    } catch (error) {
      next(error);
    }
  }
}
