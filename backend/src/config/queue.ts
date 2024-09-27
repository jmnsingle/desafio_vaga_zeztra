import { Queue } from 'bullmq';

export const transactionQueue = new Queue('transactionQueue', {
  connection: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASS,
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
  },
});
