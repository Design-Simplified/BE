import './configs/env';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// eslint-disable-next-line
import express, { Express } from 'express';
import requestip from 'request-ip';

import { appLogger } from './configs/logger';
import { currentEnv, Env } from './constants';
import { ClientUrl } from './constants/client-url-constants';
import { errorMiddleware } from './middlewares/error-middleware';
import { healthRoute, authRoute, userRoute } from './routes';

const app: Express = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

let origin = [];

if (currentEnv === Env.DEVELOPMENT) {
  origin = [ClientUrl.Development, ClientUrl.Local];
} else if (currentEnv === Env.PRODUCTION) {
  origin = [ClientUrl.Production];
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

app.use('/api/', healthRoute);
app.use('/api/auth/', authRoute);
app.use('/api/users/', userRoute);
app.use(errorMiddleware);

const port = Number(process.env.PORT_SERVER) || 5000;

export const server = app.listen(port, '0.0.0.0', () => {
  appLogger.info(`Server is running on port ${port}`);
});
