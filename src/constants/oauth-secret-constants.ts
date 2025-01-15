export const OAUTH_SECRET = {
  get CLIENT_AUTH_REDIRECT_URL_LOCAL() {
    return process.env.CLIENT_AUTH_REDIRECT_URL_LOCAL as string;
  },
  get CLIENT_AUTH_REDIRECT_URL() {
    return process.env.CLIENT_AUTH_REDIRECT_URL as string;
  },
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
  get FACEBOOK_CLIENT_ID() {
    return process.env.FACEBOOK_CLIENT_ID as string;
  },
  get FACEBOOK_CLIENT_SECRET() {
    return process.env.FACEBOOK_CLIENT_SECRET as string;
  },
  get FACEBOOK_CALLBACK_URL_BUYER_LOCAL() {
    return process.env.FACEBOOK_CALLBACK_URL_BUYER_LOCAL as string;
  },
  get FACEBOOK_CALLBACK_URL_SELLER_LOCAL() {
    return process.env.FACEBOOK_CALLBACK_URL_SELLER_LOCAL as string;
  },
  get FACEBOOK_CALLBACK_URL_BUYER() {
    return process.env.FACEBOOK_CALLBACK_URL_BUYER as string;
  },
  get FACEBOOK_CALLBACK_URL_SELLER() {
    return process.env.FACEBOOK_CALLBACK_URL_SELLER as string;
  },
};
