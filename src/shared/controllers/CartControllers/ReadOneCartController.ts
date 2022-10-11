import { Request, Response } from "express";
import { container } from "tsyringe";
import { ReadOneCartUseCase } from "../../useCases/CartUseCases/ReadOneCartUseCase";

class ReadOneCartController {
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const { id } = request.params;

      const readOneCartUseCase = container.resolve(ReadOneCartUseCase);
      const cart = await readOneCartUseCase.execute(String(id));

      return response.status(200).json(cart);
    } catch (err: any) {
      return response.status(err.statusCode).json(err);
    }
  }
}

export default new ReadOneCartController();