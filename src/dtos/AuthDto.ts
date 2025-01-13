import type { Request } from 'express';

export interface ITokenPayload {
  userId: string;
  state: string;
}

export interface IAuthDTO extends Request {
  user?: {
    userId: string;
    username: string;
    email?: string;
    role: number;
    state: string;
    googleId?: string;
    facebookId?: string;
    appleId?: string;
  };
}
