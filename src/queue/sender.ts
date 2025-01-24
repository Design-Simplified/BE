/* eslint-disable */
import { queue } from '../configs/queue';
import { SMPTP_CONSTANTS } from '../constants';
import { ResponseError } from '../error/ResponseError';

export class QueueSender {
  static async sendEmail(
    to: string,
    subject: string,
    text: string,
    html: string,
  ) {
    try {
      await queue.add({
        from: SMPTP_CONSTANTS.SMTP_EMAIL,
        to,
        subject,
        text,
        html,
      });
    } catch (error) {
      throw new ResponseError(500, 'Failed to send email');
    }
  }
}
