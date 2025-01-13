import './configs/env';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// eslint-disable-next-line
import express, { Express } from 'express';
import requestip from 'request-ip';

import { Env } from './constants';
import { ClientUrl } from './constants/client-url-constants';
import { errorMiddleware } from './middlewares/error-middleware';
import { healthRoute, authRoute } from './routes';

const app: Express = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

let origin;

if (process.env.NODE_ENV === Env.DEVELOPMENT) {
  origin = ClientUrl.Development;
} else if (process.env.NODE_ENV === Env.TESTING) {
  origin = ClientUrl.Testing;
} else if (process.env.NODE_ENV === Env.PRODUCTION) {
  origin = ClientUrl.Production;
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
app.use(errorMiddleware);

const port = Number(process.env.PORT_SERVER) || 5000;

export const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
