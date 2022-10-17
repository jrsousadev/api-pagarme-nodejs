import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../errors/AppError";
import { GetOneTransactionUseCase } from "../../useCases/TransactionUseCases/GetOneTransactionUseCase";

class GetOneTransactionController {
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const { code } = request.params

      const getOneTransactionUseCase = container.resolve(
        GetOneTransactionUseCase
      );

      const transaction: any = await getOneTransactionUseCase.execute({ code });

      if (transaction.message) throw new AppError(transaction.message, transaction.statusCode);

      return response.status(200).json(transaction);
    } catch (err: any) {
      return response.status(err.statusCode).json(err);
    }
  }
}

export default new GetOneTransactionController();
