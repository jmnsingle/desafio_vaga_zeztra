import { Schema, model } from 'mongoose';
import { randomUUID } from 'node:crypto';

const UserSchema = new Schema({
  id: { type: String, required: true, default: randomUUID() },
  name: { type: String, required: true },
  document: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const TransactionSchema = new Schema({
  id: { type: String, required: true, default: randomUUID() },
  nome: { type: String, required: true },
  cpfCnpj: { type: String, required: true, unique: true },
  valor: { type: Number, required: true },
  data: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const Transaction = model('transactions', TransactionSchema);
export const User = model('users', UserSchema);
