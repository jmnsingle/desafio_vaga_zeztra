import { Router } from 'express';
import multer from 'multer';

import { validate } from './middlewares/validator';
import { usersSchema } from './middlewares/schemas/user';
import { Controller } from '../controllers/controller';
import { uploadTransactions } from '../config/upload-transactions-file';

const controller = new Controller();
const routes = Router();

routes.get('/transactions', controller.getTransactions);
routes.post(
  '/transactions',
  multer(uploadTransactions.getConfig).single('transactions'),
  controller.createTransactions
);
routes.get('/users', controller.getUsers);
routes.post('/users', validate(usersSchema), controller.createUser);

export { routes };
