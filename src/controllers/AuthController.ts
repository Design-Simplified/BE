import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { JWT_CONFIG, OAUTH_SECRET } from '../constants';
import type { IAuthDTO, IVerifyEmailDTO } from '../dtos/AuthDto';
import type { ILoginWithEmailRequest } from '../dtos/UserDto';
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

      res.redirect(OAUTH_SECRET.CLIENT_AUTH_REDIRECT_URL_LOCAL);
    } catch (error) {
      next(error);
    }
  }

  static async loginWithEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request = req.body as ILoginWithEmailRequest;
      await AuthService.loginWithEmail(request);

      successResponse(
        res,
        StatusCodes.OK,
        'Verification email sent successfully',
      );
    } catch (error) {
      next(error);
    }
  }

  static async loginWithEmailLocal(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request = req.body as ILoginWithEmailRequest;
      await AuthService.loginWithEmailLocal(request);

      successResponse(
        res,
        StatusCodes.OK,
        'Verification email sent successfully',
      );
    } catch (error) {
      next(error);
    }
  }

  static async loginWithEmailCallback(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request = {
        emailToken: req.params.emailToken,
      } as IVerifyEmailDTO;
      const response = await AuthService.loginWithEmailCallback(request);
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

  static async loginWithEmailCallbackLocal(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request = {
        emailToken: req.params.emailToken,
      } as IVerifyEmailDTO;
      const response = await AuthService.loginWithEmailCallback(request);
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

  static async logout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      successResponse(res, StatusCodes.OK, 'Logout success');
    } catch (error) {
      next(error);
    }
  }
}
