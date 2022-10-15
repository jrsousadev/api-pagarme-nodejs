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
  readOne = async ({ id, code }: ReadOneCartData) => {
    if (code) {
      return await prismaClient.cart.findFirst({
        where: {
          code,
        },
      });
    }

    if (id) {
      return await prismaClient.cart.findFirst({
        where: {
          id,
        },
      });
    }
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
