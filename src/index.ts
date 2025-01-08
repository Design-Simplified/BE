import './configs/env';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// eslint-disable-next-line
import express, { Express } from 'express';
import requestip from 'request-ip';

import { errorMiddleware } from './middlewares/error-middleware';
import { healthRoute } from './routes/HealthRoute';

const app: Express = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  }),
);

app.use(express.json());
app.use(requestip.mw());

app.use('/api/', healthRoute);
app.use(errorMiddleware);

const port = Number(process.env.PORT_SERVER) || 5000;

export const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
