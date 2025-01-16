import dotenv from 'dotenv';

import { currentEnv, Env } from '../constants';

const envFile =
  currentEnv === Env.PRODUCTION
    ? Env.PRODUCTION_ENV_FILE
    : Env.DEVELOPMENT_ENV_FILE;
dotenv.config({ path: envFile });
