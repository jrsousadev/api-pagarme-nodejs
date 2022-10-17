import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../errors/AppError";
import { GetTransactionUseCase } from "../../useCases/TransactionUseCases/GetTransactionUseCase";

class GetTransactionController {
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const getTransactionUseCase = container.resolve(
        GetTransactionUseCase
      );

      const transactions: any = await getTransactionUseCase.execute();

      if (transactions.message) throw new AppError(transactions.message, transactions.statusCode);

      return response.status(200).json(transactions);
    } catch (err: any) {
      return response.status(err.statusCode).json(err);
    }
  }
}

export default new GetTransactionController();
