import { Request, Response, NextFunction } from "express";
import * as Yup from "yup";
import { CreateCartSchema } from "../../schemas/cart-schemas";

export const validateCreateCartSchema = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    await CreateCartSchema.validate(request.body);

    return next();
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return response.status(400).json({ message: err.message });
    }
  }
}
