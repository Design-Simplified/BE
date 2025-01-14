export const OAUTH_SECRET = {
  get GOOGLE_CLIENT_ID() {
    return process.env.GOOGLE_CLIENT_ID as string;
  },
  get GOOGLE_CLIENT_SECRET() {
    return process.env.GOOGLE_CLIENT_SECRET as string;
  },
  get GOOGLE_CALLBACK_URL_BUYER_LOCAL() {
    return process.env.GOOGLE_CALLBACK_URL_BUYER_LOCAL as string;
  },
  get GOOGLE_CALLBACK_URL_SELLER_LOCAL() {
    return process.env.GOOGLE_CALLBACK_URL_SELLER_LOCAL as string;
  },
  get GOOGLE_CALLBACK_URL_BUYER() {
    return process.env.GOOGLE_CALLBACK_URL_BUYER as string;
  },
  get GOOGLE_CALLBACK_URL_SELLER() {
    return process.env.GOOGLE_CALLBACK_URL_SELLER as string;
  },
};
