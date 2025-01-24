import nodemailer from 'nodemailer';

import { SMPTP_CONSTANTS } from '../constants';

export const transporter = nodemailer.createTransport({
  service: SMPTP_CONSTANTS.SMTP_SERVICE,
  auth: {
    user: SMPTP_CONSTANTS.SMTP_EMAIL,
    pass: SMPTP_CONSTANTS.SMTP_PASSWORD,
  },
});
