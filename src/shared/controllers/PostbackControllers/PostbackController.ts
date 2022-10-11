import { Request, Response } from "express";
import { container } from "tsyringe";
import { PostbackUseCase } from "../../useCases/PostbackUseCases/PostbackUseCase";

class PostbackController {
  async pagarme(request: Request, response: Response) {
    try {
      const { id, object, current_status } = request.body;

      const postbackUseCase = container.resolve(PostbackUseCase);

      const transaction = await postbackUseCase.execute({
        id,
        object,
        current_status,
      });

      return response.status(201).json(transaction);
    } catch (err: any) {
      return response.status(err.statusCode).json(err);
    }
  }
}

export default new PostbackController();
