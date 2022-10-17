import { prismaClient } from "../database/prismaClient";
import {
  CreateTransactionData,
  DeleteTransactionData,
  ReadOneTransactionData,
  TransactionRepository,
  UpdateTransactionData,
} from "../repositories/TransactionRepository";
import { getStatusType } from "../shared/utils/getTypesPrisma";

export class TransactionModule implements TransactionRepository {
  create = async (data: CreateTransactionData) => {
    try {
      return await prismaClient.transaction.create({ data });
    } catch (err) {
      throw err;
    }
  };

  readOne = async ({ id, code, transactionId }: ReadOneTransactionData) => {
    try {
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
    } catch (err) {
      throw err
    }
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
    const newStatus = getStatusType(status);
    return await prismaClient.transaction.update({
      where: {
        id,
      },
      data: {
        transactionId,
        pixExpiration,
        pixQRCODE,
        status: newStatus,
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
