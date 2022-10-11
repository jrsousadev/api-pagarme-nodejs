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
    const carts = await this.cartRepository.readAll();

    if (!carts) return [];

    return carts;
  };
}
