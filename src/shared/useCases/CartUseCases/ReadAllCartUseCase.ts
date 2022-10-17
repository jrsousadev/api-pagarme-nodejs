import { inject, injectable } from "tsyringe";
import {
  CartRepository,
} from "../../../repositories/CartRepository";

@injectable()
export class ReadAllCartUseCase {
  constructor(
    @inject("CartRepository")
    private cartRepository: CartRepository
  ) {}

  execute = async () => {
    try {
      const carts = await this.cartRepository.readAll();

      if (!carts) return [];
  
      return carts;
    } catch (err) {
      return {
        message: "Internal Server Error",
        statusCode: 400,
      }
    }

  };
}
