import { Request, Response, NextFunction } from "express";
import * as Yup from "yup";
import { CreateTransactionSchema } from "../../schemas/transaction-schemas";

export const validateCreateTransactionSchema = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    await CreateTransactionSchema.validate(request.body);

    return next();
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return response.status(400).json({ message: err.message });
    }
  }
};
