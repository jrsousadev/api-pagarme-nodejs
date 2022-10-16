import { Router } from "express";

import cartRoutes from "./cart-routes";
import postbackRoutes from "./postback-routes";
import transactionRoutes from "./transaction-routes";

const routes = Router();

routes.use('/cart', cartRoutes);
routes.use('/transaction', transactionRoutes);
routes.use('/postbacks', postbackRoutes);

export default routes;