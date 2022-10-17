import { inject, injectable } from "tsyringe";
import { CartRepository } from "../../../repositories/CartRepository";
import { AppError } from "../../errors/AppError";

@injectable()
export class ReadOneCartUseCase {
  constructor(
    @inject("CartRepository")
    private cartRepository: CartRepository
  ) {}

  execute = async (id: string) => {
    try {
      const cart = await this.cartRepository.readOne({ id: String(id) });

      if (!cart) throw new AppError("Cart is not exist", 404);

      return cart;
    } catch (err) {
      return {
        message: "Cart is not exist",
        statusCode: 404
      }
    }
  };
}
