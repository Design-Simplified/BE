/* eslint-disable */
import Redis from 'ioredis';

import { redisLogger } from '../configs/logger';
import { REDIS_CONSTANTS } from '../constants/redis-constants';

declare global {
  var _redisClient: Redis | undefined;
}

if (!global._redisClient) {
  global._redisClient = new Redis({
    host: REDIS_CONSTANTS.REDIS_HOST,
    port: REDIS_CONSTANTS.REDIS_PORT,
    password: REDIS_CONSTANTS.REDIS_PASSWORD,
    db: REDIS_CONSTANTS.REDIS_DB,
    reconnectOnError: err => {
      redisLogger.error('Redis reconnecting due to error: ', err);

      return true;
    },
  });
}

const redisClientWithEvents = global._redisClient!;

redisClientWithEvents.on('connect', () => {
  redisLogger.info('Redis connected');
});

redisClientWithEvents.on('ready', () => {
  redisLogger.info('Redis is ready');
});

redisClientWithEvents.on('error', err => {
  redisLogger.error('Redis error: ', err);
});

redisClientWithEvents.on('reconnecting', () => {
  redisLogger.warn('Redis is reconnecting');
});

redisClientWithEvents.on('close', () => {
  redisLogger.info('Redis connection closed');
});

redisClientWithEvents.on('end', () => {
  redisLogger.info('Redis connection ended');
});

async function connectRedis() {
  if (
    redisClientWithEvents.status !== 'ready' &&
    redisClientWithEvents.status !== 'connecting'
  ) {
    redisLogger.info('Connecting to Redis...');
    await redisClientWithEvents.connect();
  }
}

connectRedis().catch(err =>
  redisLogger.error('Error connecting to Redis:', err),
);

export const redisClient = redisClientWithEvents;
