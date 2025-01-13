import { passport } from '../configs/passport';

export class GoogleAuthMiddleware {
  static concentBuyer = passport.authenticate('google-buyer', {
    session: false,
    scope: ['profile', 'email'],
  });
  static concentSeller = passport.authenticate('google-seller', {
    session: false,
    scope: ['profile', 'email'],
  });
  static callbackBuyer = passport.authenticate('google-buyer', {
    session: false,
  });
  static callbackSeller = passport.authenticate('google-seller', {
    session: false,
  });
}
