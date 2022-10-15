import { inject, injectable } from "tsyringe";
import {
  TransactionRepository,
} from "../../../repositories/TransactionRepository";

@injectable()
export class GetTransactionUseCase {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: TransactionRepository,
  ) {}

  execute = async () => {
    const transactions = await this.transactionRepository.readAll();

    if (!transactions) return [];

    return transactions;
  };
}
