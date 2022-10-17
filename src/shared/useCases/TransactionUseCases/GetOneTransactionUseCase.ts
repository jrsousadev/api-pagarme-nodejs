import { inject, injectable } from "tsyringe";
import { TransactionRepository } from "../../../repositories/TransactionRepository";
import { AppError } from "../../errors/AppError";

interface Request {
  code: string;
}

@injectable()
export class GetOneTransactionUseCase {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: TransactionRepository
  ) {}

  execute = async ({ code }: Request) => {
    try {
      const transaction = await this.transactionRepository.readOne({ code });

      if (!transaction) throw new AppError("Transaction was not found");

      return transaction;
    } catch (err) {
      return {
        message: "Transaction was not found",
        statusCode: 400,
      };
    }
  };
}
