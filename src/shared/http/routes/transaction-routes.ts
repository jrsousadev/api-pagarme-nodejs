import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";

import CreateTransactionController from "../../controllers/TransactionControllers/CreateTransactionController";
import { CreateTransactionSchema } from "./schemas/transaction-schemas";

const transactionRoutes = Router();

transactionRoutes.post(
  "/",
  expressYupMiddleware({ schemaValidator: CreateTransactionSchema }),
  CreateTransactionController.handle
);

export default transactionRoutes;
