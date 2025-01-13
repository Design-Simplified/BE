import type { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';

import type { ITokenPayload } from '../dtos/AuthDto';
import { UserRepository } from '../repositories';

const cookieExtractor = (req: Request) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['accessToken'];
  }

  return token;
};

const opt = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    cookieExtractor,
    ExtractJwt.fromAuthHeaderAsBearerToken(),
  ]),
  secretOrKey: process.env.JWT_SECRET as string,
};

const jwtStrategy = new Strategy(opt, async (payload, done) => {
  const userData = await UserRepository.findById(payload.userId);

  const user = {
    userId: userData?.id,
  } as ITokenPayload;

  if (user) {
    return done(null, user);
  }

  return done(null, false);
});

export { jwtStrategy };
