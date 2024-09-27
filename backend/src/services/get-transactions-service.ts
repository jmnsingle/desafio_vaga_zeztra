import { DEPENDENCY_NAMES } from '../dependecy-injection';
import { Registry } from '../dependecy-injection/registry';
import { Repository, Transaction } from '../repositories/repository';

type Input = {
  initialDate: string;
  finalDate: string;
  name?: string;
  document?: string;
  page?: number;
};
type Output = { total_of_transactions: number; transactions: Transaction[] };

export class GetTransactionsService {
  constructor(
    private readonly repository: Repository = Registry.getInstance().get(
      DEPENDENCY_NAMES.REPOSITORY
    )
  ) {}

  public async execute(input: Input): Promise<Output> {
    return this.repository.getTransactions({
      initial_date: input.initialDate,
      final_date: input.finalDate,
      document: input?.document,
      name: input?.name,
      page: input?.page,
    });
    // return this.repository.getTransactions({
    //   initial_date: input?.initialDate
    //     ? new Date(input.initialDate)
    //     : new Date(),
    //   final_date: input?.finalDate ? new Date(input.finalDate) : new Date(),
    //   document: input?.document,
    //   name: input?.name,
    //   page: input?.page,
    // });
  }
}
