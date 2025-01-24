import jwt from 'jsonwebtoken';

import { JWT_CONFIG } from '../constants';
import type { ITokenPayload, ITokenEmailPayload } from '../dtos/AuthDto';

export class JwtToken {
  static generateAccessToken(payload: ITokenPayload): string {
    const secret = JWT_CONFIG.JWT_SECRET;

    return jwt.sign(payload, secret, {
      expiresIn: JWT_CONFIG.JWT_EXPIRES_IN,
    });
  }

  static generateEmailToken(payload: ITokenEmailPayload): string {
    const secret = JWT_CONFIG.JWT_EMAIL_SECRET;

    return jwt.sign(payload, secret, {
      expiresIn: JWT_CONFIG.JWT_EMAIL_EXPIRES_IN,
    });
  }

  static verifyEmailToken(token: string): ITokenEmailPayload {
    const secret = JWT_CONFIG.JWT_EMAIL_SECRET;

    return jwt.verify(token, secret) as ITokenEmailPayload;
  }
}
