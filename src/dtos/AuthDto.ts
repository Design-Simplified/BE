import type { Request } from 'express';

export interface ITokenPayload {
  userId: string;
}

export interface IAuthDTO extends Request {
  user?: {
    userId?: string;
    username?: string;
    email?: string;
    role?: number;
    googleId?: string;
    facebookId?: string;
    appleId?: string;
  };
}
