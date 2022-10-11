import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import { CreateCartSchema, UpdateCartSchema } from "../schemas/cart-schemas";

import CreateCartController from "../../controllers/CartControllers/CreateCartController";
import DeleteCartController from "../../controllers/CartControllers/DeleteCartController";
import ReadAllCartController from "../../controllers/CartControllers/ReadAllCartController";
import ReadOneCartController from "../../controllers/CartControllers/ReadOneCartController";
import UpdateCartController from "../../controllers/CartControllers/UpdateCartController";

const cartRoutes = Router();

cartRoutes.post(
  "/",
  expressYupMiddleware({ schemaValidator: CreateCartSchema }),
  CreateCartController.handle
);
cartRoutes.get("/:id", ReadOneCartController.handle);
cartRoutes.get("/", ReadAllCartController.handle);
cartRoutes.put(
  "/:id",
  expressYupMiddleware({ schemaValidator: UpdateCartSchema }),
  UpdateCartController.handle
);
cartRoutes.delete("/:code", DeleteCartController.handle);

export default cartRoutes;
