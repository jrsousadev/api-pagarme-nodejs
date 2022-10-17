import { inject, injectable } from "tsyringe";
import { AppError } from "../../errors/AppError";
import {
  CartRepository,
  CreateCartData,
} from "../../../repositories/CartRepository";

@injectable()
export class CreateCartUseCase {
  constructor(
    @inject("CartRepository")
    private cartRepository: CartRepository
  ) {}

  execute = async ({ code, price }: CreateCartData) => {
    try {
      const cartCode = await this.cartRepository.readOne({ code });

      if (cartCode) throw new AppError("Cart Code Already Exist");
  
      const cart = await this.cartRepository.create({ code, price });
  
      return cart;
    } catch (err) {
      return {
        message: "Cart Code Already Exist",
        statusCode: 400,
      }
    }
  };
}
