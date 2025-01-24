import Queue from 'bull';

import { REDIS_CONSTANTS } from '../constants';

export const queue = new Queue('queue', {
  redis: {
    host: REDIS_CONSTANTS.REDIS_HOST,
    port: REDIS_CONSTANTS.REDIS_PORT,
    password: REDIS_CONSTANTS.REDIS_PASSWORD,
  },
});

process.on('SIGINT', async () => {
  await queue.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await queue.close();
  process.exit(0);
});

export const closeQueue = async () => {
  await queue.close();
};
