import { Router } from "express";
import { validateCreateTransactionSchema } from "../middlewares/validatesSchemas/validateCreateTransactionSchema";

import CreateTransactionController from "../../controllers/TransactionControllers/CreateTransactionController";
import GetTransactionController from "../../controllers/TransactionControllers/GetTransactionController";

const transactionRoutes = Router();

transactionRoutes.post(
  "/",
  validateCreateTransactionSchema,
  CreateTransactionController.handle
);

transactionRoutes.get("/", GetTransactionController.handle);

export default transactionRoutes;
