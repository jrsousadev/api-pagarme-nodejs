import { Router } from "express";
import { validateCreateCartSchema } from "../middlewares/validatesSchemas/validateCreateCartSchema";
import { validateUpdateCartSchema } from "../middlewares/validatesSchemas/validateUpdateCartSchema";

import CreateCartController from "../../controllers/CartControllers/CreateCartController";
import DeleteCartController from "../../controllers/CartControllers/DeleteCartController";
import ReadAllCartController from "../../controllers/CartControllers/ReadAllCartController";
import ReadOneCartController from "../../controllers/CartControllers/ReadOneCartController";
import UpdateCartController from "../../controllers/CartControllers/UpdateCartController";

const cartRoutes = Router();

cartRoutes.post("/", validateCreateCartSchema, CreateCartController.handle);
cartRoutes.get("/:id", ReadOneCartController.handle);
cartRoutes.get("/", ReadAllCartController.handle);
cartRoutes.put("/:id", validateUpdateCartSchema, UpdateCartController.handle);
cartRoutes.delete("/:id", DeleteCartController.handle);

export default cartRoutes;
