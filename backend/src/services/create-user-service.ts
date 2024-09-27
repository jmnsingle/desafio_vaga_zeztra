import { UserInput } from '../routes/middlewares/schemas/user';

type Output = {};

export class CreateUserService {
  public async execute(input: UserInput): Promise<Output> {
    return {};
  }
}
