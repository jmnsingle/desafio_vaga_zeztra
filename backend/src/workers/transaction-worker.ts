import { Worker } from 'bullmq';

import { TransactionFileProcessor } from '../jobs/transaction-processing-job';

const fileProcessor = new TransactionFileProcessor();

export const worker = new Worker(
  'transactionQueue',
  async (job) => {
    const filePath = job.data.filePath;
    try {
      await fileProcessor.processFile(filePath);
    } catch (error) {
      console.error('Error processing file:', error);
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASS || undefined,
    },
  }
);
