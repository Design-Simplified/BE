import './configs/env';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// eslint-disable-next-line
import express, { Express } from 'express';
import path from 'path';
import requestip from 'request-ip';

import { appLogger } from './configs/logger';
import { currentEnv, Env } from './constants';
import { clientUrl } from './constants/client-url-constants';
import { errorMiddleware } from './middlewares/ErrorMiddleware';
import {
  healthRoute,
  authRoute,
  userRoute,
  transactionRoute,
  couponPackageRoute,
  membershipTypeRoute,
} from './routes';

const app: Express = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

let origin = [];

if (currentEnv === Env.DEVELOPMENT) {
  origin = [clientUrl.DEVELOPMENT, clientUrl.LOCAL];
} else if (currentEnv === Env.PRODUCTION) {
  origin = [clientUrl.PRODUCTION];
} else {
  appLogger.error('Invalid environment');
  process.exit(1);
}

app.use(
  cors({
    credentials: true,
    origin: origin,
  }),
);

app.use(express.json());
app.use(requestip.mw());

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/', healthRoute);
app.use('/api/auth/', authRoute);
app.use('/api/users/', userRoute);
app.use('/api/transactions/', transactionRoute);
app.use('/api/coupon-packages/', couponPackageRoute);
app.use('/api/membership-types/', membershipTypeRoute);
app.use(errorMiddleware);

const port = Number(process.env.PORT_SERVER) || 5000;

export const server = app.listen(port, '0.0.0.0', () => {
  appLogger.info(`Server is running on port ${port}`);
});
