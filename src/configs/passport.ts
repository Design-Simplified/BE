import passport from 'passport';

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

export { passport };
