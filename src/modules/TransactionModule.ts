import { prismaClient } from "../database/prismaClient";
import {
  CreateTransactionData,
  DeleteTransactionData,
  ReadOneTransactionData,
  TransactionRepository,
  UpdateTransactionData,
} from "../repositories/TransactionRepository";

export class TransactionModule implements TransactionRepository {
  create = async (data: CreateTransactionData) => {
    return await prismaClient.transaction.create({ data });
  };

  readOne = async ({ id, code, transactionId }: ReadOneTransactionData) => {
    if (transactionId) {
      return await prismaClient.transaction.findFirst({
        where: {
          transactionId,
        },
      });
    }

    if (code) {
      return await prismaClient.transaction.findFirst({
        where: {
          code,
        },
      });
    }

    return await prismaClient.transaction.findFirst({
      where: {
        id,
      },
    });
  };

  readAll = async () => {
    return await prismaClient.transaction.findMany({});
  };

  update = async ({
    id,
    status,
    transactionId,
    pixExpiration,
    pixQRCODE,
    billetBarcode,
    billetExpiration,
    billetUrl,
  }: UpdateTransactionData) => {
    return await prismaClient.transaction.update({
      where: {
        id,
      },
      data: {
        transactionId,
        pixExpiration,
        pixQRCODE,
        status,
        billetBarcode,
        billetExpiration,
        billetUrl,
      },
    });
  };

  delete = async ({ id }: DeleteTransactionData) => {
    await prismaClient.transaction.delete({
      where: {
        id,
      },
    });
  };
}
