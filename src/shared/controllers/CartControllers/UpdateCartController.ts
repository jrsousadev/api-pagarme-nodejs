import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCartUseCase } from "../../useCases/CartUseCases/UpdateCartUseCase";

class UpdateCartController {
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const { id } = request.params;
      const { code, price } = request.body;

      const updateCartUseCase = container.resolve(UpdateCartUseCase);

      const cart = await updateCartUseCase.execute({ id, code, price });

      return response.status(202).json(cart);
    } catch (err: any) {
      return response.status(err.statusCode).json(err)
    }
  }
}

export default new UpdateCartController();
