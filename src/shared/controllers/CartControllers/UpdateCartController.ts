import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../errors/AppError";
import { UpdateCartUseCase } from "../../useCases/CartUseCases/UpdateCartUseCase";

class UpdateCartController {
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const { id } = request.params;

      const { code, price } = request.body;

      const updateCartUseCase = container.resolve(UpdateCartUseCase);

      const cart: any = await updateCartUseCase.execute({ id, code, price });

      if (cart.message) throw new AppError(cart.message, cart.statusCode);

      return response.status(202).json(cart);
    } catch (err: any) {
      return response.status(err.statusCode).json(err)
    }
  }
}

export default new UpdateCartController();
