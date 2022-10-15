import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import { CreateTransactionSchema } from "../schemas/transaction-schemas";

import CreateTransactionController from "../../controllers/TransactionControllers/CreateTransactionController";
import GetTransactionController from "../../controllers/TransactionControllers/GetTransactionController";

const transactionRoutes = Router();

transactionRoutes.post(
  "/",
  expressYupMiddleware({ schemaValidator: CreateTransactionSchema }),
  CreateTransactionController.handle
);

transactionRoutes.get("/", GetTransactionController.handle);

export default transactionRoutes;
