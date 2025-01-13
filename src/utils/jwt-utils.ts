import jwt from 'jsonwebtoken';

import { JWT_CONFIG } from '../constants';
import type { ITokenPayload } from '../dtos/AuthDto';

export class JwtToken {
  static generateAccessToken(payload: ITokenPayload): string {
    const secret = JWT_CONFIG.JWT_SECRET;

    return jwt.sign(payload, secret, {
      expiresIn: JWT_CONFIG.JWT_EXPIRES_IN,
    });
  }
}
