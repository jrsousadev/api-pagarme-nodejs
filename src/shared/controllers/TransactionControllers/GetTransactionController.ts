import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetTransactionUseCase } from "../../useCases/TransactionUseCases/GetTransactionUseCase";

class CreateTransactionController {
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const getTransactionUseCase = container.resolve(
        GetTransactionUseCase
      );

      const transactions = await getTransactionUseCase.execute();

      return response.status(200).json(transactions);
    } catch (err: any) {
      return response.status(err.statusCode).json(err);
    }
  }
}

export default new CreateTransactionController();
