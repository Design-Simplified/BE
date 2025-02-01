export const MIDTRANS_SECRET = {
  get MIDTRANS_SERVER_KEY() {
    return process.env.MIDTRANS_SERVER_KEY as string;
  },

  get MIDTRANS_APP_URL() {
    return process.env.MIDTRANS_APP_URL as string;
  },
};
