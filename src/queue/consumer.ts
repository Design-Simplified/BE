import '../configs/env';
import { appLogger } from '../configs/logger';
import { transporter } from '../configs/nodemailer';
import { queue } from '../configs/queue';

export class QueueConsumer {
  static async processEmail() {
    queue.process(async job => {
      const { from, to, subject, text, html } = job.data;
      await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html,
      });
    });

    appLogger.info('Email queue consumer started');
  }
}

QueueConsumer.processEmail().catch(err => {
  appLogger.error('Failed to process email queue: ', err);
});
