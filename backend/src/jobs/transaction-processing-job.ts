import fs from 'fs';
import crypto from 'node:crypto';

import { parseTransactionLine } from '../utils/file-utils';
import { Repository, Transaction } from '../repositories/repository';

// export class TransactionFileProcessor {
//   constructor(
//     private readonly repository: Repository = Registry.getInstance().get(
//       DEPENDENCY_NAMES.REPOSITORY
//     )
//   ) {}
//   public async processFile(filePath: string): Promise<void> {
//     const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
//     const lines = fileContent.split('\n');

//     for await (const line of lines) {
//       const transactionData = parseTransactionLine(line);
//       await this.handleTransaction(transactionData);
//     }
//     fs.unlinkSync(filePath);
//   }

//   private async handleTransaction(transactionData: Transaction): Promise<void> {
//     const userExists = await this.repository.findUserByDocument(
//       transactionData.cpfCnpj
//     );
//     if (!userExists) {
//       await this.repository.createUser({
//         id: crypto.randomUUID(),
//         name: transactionData.nome,
//         document: transactionData.cpfCnpj,
//       });
//     }
//     await this.repository.createTransaction(transactionData);
//   }
// }

export class TransactionFileProcessor {
  private readonly batchSize = 1000;
  private transactionBatch: Transaction[] = [];
  private userBatch: { id: string; name: string; document: string }[] = [];
  private userSet: Set<string> = new Set();
  private repository: Repository;
  constructor() {
    this.repository = new Repository();
  }

  public async processFile(filePath: string): Promise<void> {
    // console.log('REPOSITORY', this.repository);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const lines = fileContent.split('\n');

    for await (const line of lines) {
      const transactionData = parseTransactionLine(line);
      await this.handleTransaction(transactionData);
      if (this.transactionBatch.length >= this.batchSize) {
        await this.flushBatches();
      }
    }
    if (this.transactionBatch.length > 0 || this.userBatch.length > 0) {
      await this.flushBatches();
    }
    fs.unlinkSync(filePath);
  }

  private async handleTransaction(transactionData: Transaction): Promise<void> {
    if (!this.userSet.has(transactionData.cpfCnpj)) {
      this.userBatch.push({
        id: crypto.randomUUID(),
        name: transactionData.nome,
        document: transactionData.cpfCnpj,
      });
      this.userSet.add(transactionData.cpfCnpj);
    }
    this.transactionBatch.push(transactionData);
  }

  private async flushBatches(): Promise<void> {
    try {
      if (this.userBatch.length > 0) {
        await this.repository.bulkCreateUsers(this.userBatch);
        this.userBatch.length = 0;
      }

      if (this.transactionBatch.length > 0) {
        await this.repository.bulkCreateTransactions(this.transactionBatch);
        this.transactionBatch.length = 0;
      }
    } catch (error) {
      console.error('Error during bulk insert:', error);
    }
  }
}
