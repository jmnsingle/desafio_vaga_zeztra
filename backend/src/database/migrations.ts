import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { Transaction, User } from './schemas';

dotenv.config();

const runMigrations = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    await User.init();
    await Transaction.init();
    console.log('Migration completed: Collections created');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.connection.close();
  }
};

runMigrations();
