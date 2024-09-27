import path from 'node:path';

import { uploadTransactions } from '../config/upload-transactions-file';
import { transactionQueue } from '../config/queue';

export class CreateTransactionsService {
  public async execute(file_name: string): Promise<void> {
    const filePath = path.join(uploadTransactions.getUrl(), file_name);
    await transactionQueue.add('processTransactionFile', { filePath });
  }
}
