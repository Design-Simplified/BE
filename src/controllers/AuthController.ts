import type { Request, Response, NextFunction } from 'express';

import { JWT_CONFIG } from '../constants';
import type { IAuthDTO } from '../dtos/AuthDto';
import { AuthService } from '../services';

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

      res.redirect('https://fe-design-simplified.vercel.app/');
    } catch (error) {
      next(error);
    }
  }
}
