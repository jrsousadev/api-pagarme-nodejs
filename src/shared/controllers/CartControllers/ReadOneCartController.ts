import { Request, Response } from "express";
import { container } from "tsyringe";
import { CartDTO } from "../../../DTO/CartDTO";
import { AppError, AppErrorResponse } from "../../errors/AppError";
import { ReadOneCartUseCase } from "../../useCases/CartUseCases/ReadOneCartUseCase";

class ReadOneCartController {
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const { id } = request.params;

      const readOneCartUseCase = container.resolve(ReadOneCartUseCase);
      const cart: any = await readOneCartUseCase.execute(String(id));

      if (cart.message) throw new AppError(cart.message, cart.statusCode);

      return response.status(200).json(cart);
    } catch (err: any) {
      return response.status(err.statusCode).json(err);
    }
  }
}

export default new ReadOneCartController();