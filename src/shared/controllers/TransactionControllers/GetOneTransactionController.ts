import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetOneTransactionUseCase } from "../../useCases/TransactionUseCases/GetOneTransactionUseCase";

class GetOneTransactionController {
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const { code } = request.params

      const getOneTransactionUseCase = container.resolve(
        GetOneTransactionUseCase
      );

      const transaction = await getOneTransactionUseCase.execute({ code });

      return response.status(200).json(transaction);
    } catch (err: any) {
      return response.status(err.statusCode).json(err);
    }
  }
}

export default new GetOneTransactionController();
