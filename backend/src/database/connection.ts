import mongoose, { Mongoose } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export class MongoConnection {
  private dbConnection: Mongoose;

  constructor() {
    const mongoUri = process.env.MONGO_URI as string;
    this.dbConnection = mongoose;
    this.connect(mongoUri);
  }

  private async connect(mongoUri: string) {
    try {
      await this.dbConnection.connect(mongoUri);
      console.log('Successfully connected to MongoDB');
    } catch (error) {
      console.log('Error connecting to MongoDB:', error);
      throw new Error('Database connection failed');
    }
  }
  async disconnect(): Promise<void> {
    await this.dbConnection.disconnect();
  }
}
