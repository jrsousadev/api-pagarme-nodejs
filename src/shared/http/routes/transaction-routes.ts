import { Router } from "express";
import { validateCreateTransactionSchema } from "../middlewares/validatesSchemas/validateCreateTransactionSchema";

import CreateTransactionController from "../../controllers/TransactionControllers/CreateTransactionController";
import GetTransactionController from "../../controllers/TransactionControllers/GetTransactionController";
import GetOneTransactionController from "../../controllers/TransactionControllers/GetOneTransactionController";

const transactionRoutes = Router();

transactionRoutes.post(
  "/",
  validateCreateTransactionSchema,
  CreateTransactionController.handle
);

transactionRoutes.get("/:code", GetOneTransactionController.handle);
transactionRoutes.get("/", GetTransactionController.handle);

export default transactionRoutes;
