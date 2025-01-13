import passport from 'passport';

import { googleStrategyBuyer } from '../strategies/google-strategy-buyer';
import { googleStrategySeller } from '../strategies/google-strategy-seller';
import { jwtStrategy } from '../strategies/jwt-strategy';

passport.use('jwt', jwtStrategy);
passport.use('google-buyer', googleStrategyBuyer);
passport.use('google-seller', googleStrategySeller);

export { passport };
