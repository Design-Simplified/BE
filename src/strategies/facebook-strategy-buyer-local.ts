import { Strategy as FacebookStrategy } from 'passport-facebook';

import { OAUTH_SECRET, Role, UserState } from '../constants';

const facebookConfig = {
  clientID: OAUTH_SECRET.FACEBOOK_CLIENT_ID,
  clientSecret: OAUTH_SECRET.FACEBOOK_CLIENT_SECRET,
  callbackURL: OAUTH_SECRET.FACEBOOK_CALLBACK_URL_BUYER_LOCAL,
  profileFields: ['id', 'displayName', 'email'],
};

const facebookStrategyBuyerLocal = new FacebookStrategy(
  facebookConfig,
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails![0].value;
      const name = profile.displayName;
      const facebookId = profile.id;

      if (email) {
        const user = {
          email: email,
          username: name,
          facebookId: facebookId,
          state: UserState.BUYER,
          role: Role.USER,
        };

        return done(null, user);
      }

      const user = {
        username: name,
        facebookId: facebookId,
        state: UserState.BUYER,
        role: Role.USER,
      };

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  },
);

export { facebookStrategyBuyerLocal };
