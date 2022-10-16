import { Request, Response, NextFunction } from "express";
import { UpdateCartSchema } from "../../schemas/cart-schemas";
import * as Yup from "yup";

export const validateUpdateCartSchema = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    await UpdateCartSchema.validate(request.body);

    return next();
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return response.status(400).json({ message: err.message });
    }
  }
}
