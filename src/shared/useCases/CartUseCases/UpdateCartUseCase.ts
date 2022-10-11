import { inject, injectable } from "tsyringe";
import { AppError } from "../../errors/AppError";
import {
  CartRepository,
  UpdateCartData,
} from "../../../repositories/CartRepository";

@injectable()
export class UpdateCartUseCase {
  constructor(
    @inject("CartRepository")
    private cartRepository: CartRepository
  ) {}

  execute = async ({ id, code, price }: UpdateCartData) => {
    const cartExist = await this.cartRepository.readOne({ id });

    if (!cartExist) throw new AppError("Cart is not exist", 404);

    const cart = await this.cartRepository.update({ id, code, price });

    return cart;
  };
}
