import dotenv from 'dotenv';

import {
  DEV_ENV_FILE,
  PROD_ENV,
  PROD_ENV_FILE,
} from '../constants/env-constants';

const envFile =
  process.env.NODE_ENV === PROD_ENV ? PROD_ENV_FILE : DEV_ENV_FILE;
dotenv.config({ path: envFile });
