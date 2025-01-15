import passport from 'passport';

import { facebookStrategyBuyer } from '../strategies/facebook-strategy-buyer';
import { facebookStrategyBuyerLocal } from '../strategies/facebook-strategy-buyer-local';
import { facebookStrategySeller } from '../strategies/facebook-strategy-seller';
import { facebookStrategySellerLocal } from '../strategies/facebook-strategy-seller-local';
import { googleStrategyBuyer } from '../strategies/google-strategy-buyer';
import { googleStrategyBuyerLocal } from '../strategies/google-strategy-buyer-local';
import { googleStrategySeller } from '../strategies/google-strategy-seller';
import { googleStrategySellerLocal } from '../strategies/google-strategy-seller-local';
import { jwtStrategy } from '../strategies/jwt-strategy';

passport.use('jwt', jwtStrategy);
passport.use('google-buyer', googleStrategyBuyer);
passport.use('google-seller', googleStrategySeller);
passport.use('google-buyer-local', googleStrategyBuyerLocal);
passport.use('google-seller-local', googleStrategySellerLocal);
passport.use('facebook-buyer', facebookStrategyBuyer);
passport.use('facebook-seller', facebookStrategySeller);
passport.use('facebook-buyer-local', facebookStrategyBuyerLocal);
passport.use('facebook-seller-local', facebookStrategySellerLocal);

export { passport };
