import { prismaClient } from "../database/prismaClient";
import {
  CartRepository,
  CreateCartData,
  DeleteCartData,
  ReadOneCartData,
  UpdateCartData,
} from "../repositories/CartRepository";

export class CartModule implements CartRepository {
  create = async (data: CreateCartData) => {
    return await prismaClient.cart.create({ data });
  };
  readOne = async ({ id }: ReadOneCartData) => {
    const cart = await prismaClient.cart.findFirst({
      where: {
        code: id,
      },
    });

    if (!cart)
      return await prismaClient.cart.findFirst({
        where: {
          id,
        },
      });

    return cart;
  };
  readAll = async () => {
    return await prismaClient.cart.findMany({});
  };
  update = async ({ id, code, price }: UpdateCartData) => {
    return await prismaClient.cart.update({
      where: {
        id,
      },
      data: {
        code,
        price,
      },
    });
  };
  delete = async ({ id }: DeleteCartData) => {
    await prismaClient.cart.delete({
      where: {
        id,
      },
    });
  };
}
