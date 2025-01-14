import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { OAUTH_SECRET, Role, UserState } from '../constants';

const googleConfig = {
  clientID: OAUTH_SECRET.GOOGLE_CLIENT_ID,
  clientSecret: OAUTH_SECRET.GOOGLE_CLIENT_SECRET,
  callbackURL: OAUTH_SECRET.GOOGLE_CALLBACK_URL_BUYER_LOCAL,
};

const googleStrategyBuyerLocal = new GoogleStrategy(
  googleConfig,
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails![0].value;
      const name = profile.displayName;
      const googleId = profile.id;

      const user = {
        email: email,
        username: name,
        googleId: googleId,
        state: UserState.BUYER,
        role: Role.USER,
      };

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  },
);

export { googleStrategyBuyerLocal };
