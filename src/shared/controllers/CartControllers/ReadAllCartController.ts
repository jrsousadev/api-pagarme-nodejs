import { Request, Response } from "express";
import { container } from "tsyringe";
import { ReadAllCartUseCase } from "../../useCases/CartUseCases/ReadAllCartUseCase";

class ReadAllCartController {
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const readAllCartUseCase = container.resolve(ReadAllCartUseCase);
      const carts = await readAllCartUseCase.execute();

      return response.status(200).json(carts);
    } catch (err: any) {
      return response.status(err.statusCode).json(err)
    }
  }
}

export default new ReadAllCartController();