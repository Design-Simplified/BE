import type { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { currentEnv, Env } from '../constants';
import { ResponseError } from '../error/ResponseError';
import { UserRepository } from '../repositories';

const cookieExtractor = (req: Request) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['accessToken'];
  }

  return token;
};

let extractors = [];

if (currentEnv == Env.PRODUCTION) {
  extractors = [cookieExtractor];
} else {
  extractors = [cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()];
}

const opt = {
  jwtFromRequest: ExtractJwt.fromExtractors(extractors),
  secretOrKey: process.env.JWT_SECRET as string,
};

const jwtStrategy = new Strategy(opt, async (payload, done) => {
  try {
    const userData = await UserRepository.findById(payload.userId);

    if (!userData) {
      throw new ResponseError(401, 'Unauthorized!');
    }

    const user = {
      userId: userData.id,
      username: userData.username,
      email: userData?.email,
      role: userData.roleId,
      state: payload.state,
    };

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

export { jwtStrategy };
