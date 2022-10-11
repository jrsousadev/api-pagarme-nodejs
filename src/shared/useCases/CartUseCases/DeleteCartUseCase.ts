import { inject, injectable } from "tsyringe";
import { CartRepository } from "../../../repositories/CartRepository";
import { AppError } from "../../errors/AppError";

@injectable()
export class DeleteCartUseCase {
  constructor(
    @inject("CartRepository")
    private cartRepository: CartRepository
  ) {}

  execute = async (id: string) => {
    const cart = await this.cartRepository.readOne({ id });

    if (!cart) throw new AppError("Cart is not exist", 404);

    await this.cartRepository.delete({ id });

    const isCartExist = await this.cartRepository.readOne({ id });

    if (isCartExist) throw new AppError("Internal server error", 500);

    return {
      message: "Cart Deleted"
    };
  };
}
