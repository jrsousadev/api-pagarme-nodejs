import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../errors/AppError";
import { CreateCartUseCase } from "../../useCases/CartUseCases/CreateCartUseCase";

class CreateCartController {
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const { code, price } = request.body;

      const createCartUseCase = container.resolve(CreateCartUseCase);

      const cart: any = await createCartUseCase.execute({ code, price });

      if (cart.message) throw new AppError(cart.message, cart.statusCode);

      return response.status(201).json(cart);
    } catch (err: any) {
      return response.status(err.statusCode).json(err)
    }
  }
}

export default new CreateCartController();