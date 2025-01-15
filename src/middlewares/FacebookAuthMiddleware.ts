import { passport } from '../configs/passport';

export class FacebookAuthMiddleware {
  static concentBuyerLocal = passport.authenticate('facebook-buyer-local', {
    session: false,
    scope: ['email', 'public_profile'],
  });
  static concentSellerLocal = passport.authenticate('facebook-seller-local', {
    session: false,
    scope: ['email', 'public_profile'],
  });
  static concentBuyer = passport.authenticate('facebook-buyer', {
    session: false,
    scope: ['email', 'public_profile'],
  });
  static concentSeller = passport.authenticate('facebook-seller', {
    session: false,
    scope: ['email', 'public_profile'],
  });
  static callbackBuyerLocal = passport.authenticate('facebook-buyer-local', {
    session: false,
  });
  static callbackSellerLocal = passport.authenticate('facebook-seller-local', {
    session: false,
  });
  static callbackBuyer = passport.authenticate('facebook-buyer', {
    session: false,
  });
  static callbackSeller = passport.authenticate('facebook-seller', {
    session: false,
  });
}
