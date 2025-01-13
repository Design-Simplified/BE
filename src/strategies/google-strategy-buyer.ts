import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { OAUTH_SECRET, Role } from '../constants';
import type { IAuthDTO } from '../dtos/AuthDto';

const googleConfig = {
  clientID: OAUTH_SECRET.GOOGLE_CLIENT_ID,
  clientSecret: OAUTH_SECRET.GOOGLE_CLIENT_SECRET,
  callbackURL: OAUTH_SECRET.GOOGLE_CALLBACK_URL_BUYER,
  passReqToCallback: true as true,
};

const googleStrategyBuyer = new GoogleStrategy(
  googleConfig,
  async (req: IAuthDTO, accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails![0].value;
      const name = profile.displayName;
      const googleId = profile.id;

      const user = {
        email: email,
        username: name,
        googleId: googleId,
        role: Role.BUYER,
      };

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  },
);

export { googleStrategyBuyer };
