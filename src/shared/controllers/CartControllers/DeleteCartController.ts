import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../errors/AppError";
import { DeleteCartUseCase } from "../../useCases/CartUseCases/DeleteCartUseCase";

class DeleteCartController {
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const { id } = request.params;

      const deleteCartUseCase = container.resolve(DeleteCartUseCase);
      const cart: any = await deleteCartUseCase.execute(id);

      if (cart.message) throw new AppError(cart.message, cart.statusCode);

      return response.status(202).json(cart);
    } catch (err: any) {
      return response.status(err.statusCode).json(err)
    }
  }
}

export default new DeleteCartController();