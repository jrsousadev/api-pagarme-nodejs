import { Router } from "express";

import cartRoutes from "./cart-routes";
import postbackRoutes from "./postback-routes";
import transactionRoutes from "./transaction-routes";

const routes = Router();

routes.use('/api/cart', cartRoutes);
routes.use('/api/transaction', transactionRoutes);
routes.use('/api/postbacks', postbackRoutes);

export default routes;