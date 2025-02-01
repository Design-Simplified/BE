export const clientUrl = {
  get LOCAL() {
    return process.env.CLIENT_URL_LOCAL as string;
  },
  get DEVELOPMENT() {
    return process.env.CLIENT_URL as string;
  },
  get PRODUCTION() {
    return process.env.CLIENT_URL as string;
  },
};
