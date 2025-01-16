export enum Env {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  DEVELOPMENT_ENV_FILE = '.env.development',
  PRODUCTION_ENV_FILE = '.env.production',
}

export const currentEnv = process.env.NODE_ENV;
