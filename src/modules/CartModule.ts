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
    try {
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
    } catch (err) {
      throw err;
    }
  };
  readAll = async () => {
    try {
      return await prismaClient.cart.findMany({});
    } catch (err) {
      throw err;
    }
  };
  update = async ({ id, code, price }: UpdateCartData) => {
    try {
      return await prismaClient.cart.update({
        where: {
          id,
        },
        data: {
          code,
          price,
        },
      });
    } catch (err) {
      throw err;
    }
  };
  delete = async ({ id }: DeleteCartData) => {
    try {
      await prismaClient.cart.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      throw err;
    }
  };
}
