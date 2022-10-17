import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../errors/AppError";
import { ReadAllCartUseCase } from "../../useCases/CartUseCases/ReadAllCartUseCase";

class ReadAllCartController {
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const readAllCartUseCase = container.resolve(ReadAllCartUseCase);
      const carts: any = await readAllCartUseCase.execute();

      if (carts.message) throw new AppError(carts.message, carts.statusCode);

      return response.status(200).json(carts);
    } catch (err: any) {
      return response.status(err.statusCode).json(err)
    }
  }
}

export default new ReadAllCartController();