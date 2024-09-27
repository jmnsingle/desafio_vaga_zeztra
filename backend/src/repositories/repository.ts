/* eslint-disable @typescript-eslint/no-explicit-any */
import { Transaction, User } from '../database/schemas';

export type Transaction = {
  id: string;
  nome: string;
  cpfCnpj: string;
  valor: number;
  data: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Repository {
  async createTransaction(transaction: Transaction): Promise<void> {
    try {
      await Transaction.updateOne(
        { id: transaction.id },
        { $set: transaction },
        { upsert: true }
      );
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  }

  async getTransactions({
    initial_date,
    final_date,
    name,
    document,
    page = 1,
    perPage = 10,
  }: {
    initial_date: string;
    final_date: string;
    name?: string;
    document?: string;
    page?: number;
    perPage?: number;
  }): Promise<{ total_of_transactions: number; transactions: Transaction[] }> {
    try {
      const filter: any = {
        data: { $gte: initial_date, $lte: final_date },
      };
      if (name) {
        filter.nome = { $regex: name, $options: 'i' }; // Case-insensitive search for name
      }
      if (document) {
        filter.cpfCnpj = document;
      }
      const total_of_transactions = await Transaction.countDocuments(filter);
      const transactions = await Transaction.find(filter)
        .sort({ date: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage);

      return {
        total_of_transactions,
        transactions,
      };
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  }

  async findUserByDocument(cpfCnpj: string) {
    return await User.findOne({ document: cpfCnpj });
  }

  async createUser(user: {
    id: string;
    name: string;
    document: string;
  }): Promise<void> {
    try {
      await User.create(user);
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  }

  async bulkCreateTransactions(transactions: Transaction[]): Promise<void> {
    try {
      console.log('transactions', transactions);
      await Transaction.insertMany(transactions, { ordered: false }); // Ordered false to continue on errors
    } catch (error) {
      console.error('Error during bulk transaction insert:', error);
      throw new Error('Bulk transaction insert failed');
    }
  }

  async bulkCreateUsers(
    users: { id: string; name: string; document: string }[]
  ): Promise<void> {
    try {
      console.log('users', users);
      await User.insertMany(users, { ordered: false });
    } catch (error) {
      console.error('Error during bulk user insert:', error);
      throw new Error('Bulk insert failed');
    }
  }
}
