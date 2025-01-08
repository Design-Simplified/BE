import { PrismaClient } from '@prisma/client';

import { prismaLogger } from './logger';

declare global {
  // eslint-disable-next-line no-unused-vars
  var globalDb: PrismaClient | undefined;
}

if (!global.globalDb) {
  global.globalDb = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'event',
        level: 'info',
      },
      {
        emit: 'event',
        level: 'warn',
      },
      {
        emit: 'event',
        level: 'error',
      },
    ],
  });
}

const databaseWithEvents = global.globalDb as PrismaClient & {
  $on: (e: string, listener: (e: any) => void) => void;
};

databaseWithEvents.$on('query', (e: any) => {
  prismaLogger.info(e);
});

databaseWithEvents.$on('info', (e: any) => {
  prismaLogger.info(e);
});

databaseWithEvents.$on('warn', (e: any) => {
  prismaLogger.warn(e);
});

databaseWithEvents.$on('error', (e: any) => {
  prismaLogger.error(e);
});

export const db: PrismaClient = global.globalDb;
