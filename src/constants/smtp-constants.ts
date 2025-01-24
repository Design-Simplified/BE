export const SMPTP_CONSTANTS = {
  get SMTP_SERVICE() {
    return process.env.SMTP_SERVICE as string;
  },
  get SMTP_EMAIL() {
    return process.env.SMTP_EMAIL as string;
  },
  get SMTP_PASSWORD() {
    return process.env.SMTP_PASSWORD as string;
  },
};
