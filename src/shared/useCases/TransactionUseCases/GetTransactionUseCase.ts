import { inject, injectable } from "tsyringe";
import { TransactionRepository } from "../../../repositories/TransactionRepository";

@injectable()
export class GetTransactionUseCase {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: TransactionRepository
  ) {}

  execute = async () => {
    try {
      const transactions = await this.transactionRepository.readAll();

      if (!transactions) return [];

      return transactions;
    } catch (err) {
      return {
        message: "Internal Server error",
        statusCode: 400,
      };
    }
  };
}
