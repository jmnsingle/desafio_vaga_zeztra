import { Request, Response } from 'express';

import { CreateTransactionsService } from '../services/create-transactions-service';
import { GetTransactionsService } from '../services/get-transactions-service';
import { CreateUserService } from '../services/create-user-service';
import { GetUsersService } from '../services/get-users-service';

export class Controller {
  public async createTransactions(req: Request, res: Response) {
    if (!req.file) {
      return res.status(409).json({
        response: `Invalid file type`,
      });
    }
    const service = new CreateTransactionsService();
    await service.execute(req.file.filename);
    return res.status(201).json({
      message:
        'File upload acknowledged. Processing will be done in the background.',
    });
  }
  public async getTransactions(req: Request, res: Response) {
    const service = new GetTransactionsService();
    const transactions = await service.execute(req.query as any);
    return res.json(transactions);
  }
  public async createUser(req: Request, res: Response) {
    const service = new CreateUserService();
    await service.execute(req.body);
    return res.json({ message: 'User created' });
  }
  public async getUsers(req: Request, res: Response) {
    const service = new GetUsersService();
    const users = await service.execute(req.params);
    return res.json(users);
  }
}
