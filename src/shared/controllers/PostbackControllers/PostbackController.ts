import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../errors/AppError";
import { PostbackUseCase } from "../../useCases/PostbackUseCases/PostbackUseCase";

class PostbackController {
  async pagarme(request: Request, response: Response) {
    try {
      const { id, object, current_status } = request.body;
      const { tokenAccess } = request.params;

      const postbackUseCase = container.resolve(PostbackUseCase);

      const transaction: any = await postbackUseCase.execute({
        id,
        object,
        current_status,
        tokenAccess: String(tokenAccess),
      });

      if (transaction.message) throw new AppError(transaction.message, transaction.statusCode);

      return response.status(201).json(transaction);
    } catch (err: any) {
      return response.status(err.statusCode).json(err);
    }
  }
}

export default new PostbackController();
