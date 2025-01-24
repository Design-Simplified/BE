export const JWT_CONFIG = {
  get JWT_SECRET() {
    return process.env.JWT_SECRET as string;
  },
  get JWT_EXPIRES_IN() {
    return Number(process.env.JWT_EXPIRES_IN);
  },

  get JWT_EMAIL_SECRET() {
    return process.env.JWT_EMAIL_SECRET as string;
  },

  get JWT_EMAIL_EXPIRES_IN() {
    return Number(process.env.JWT_EMAIL_EXPIRES_IN);
  },
};
