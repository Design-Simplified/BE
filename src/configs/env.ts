import dotenv from 'dotenv';

import { Env } from '../constants';

const envFile =
  process.env.NODE_ENV === Env.PRODUCTION
    ? Env.PRODUCTION_ENV_FILE
    : Env.DEVELOPMENT_ENV_FILE;
dotenv.config({ path: envFile });
