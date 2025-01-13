import type { Request, Response, NextFunction } from 'express';

import { JWT_CONFIG } from '../constants';
import { AuthService } from '../services';

export class AuthController {
  static async loginWithGoogle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const response = await AuthService.loginWithGoogle(req);
      const accessTokenDuration = JWT_CONFIG.JWT_EXPIRES_IN;

      console.log(accessTokenDuration);

      res.cookie('accessToken', response.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: accessTokenDuration,
      });

      res.redirect('www.google.com');
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
