import { Router } from "express";
import PostbackController from "../../controllers/PostbackControllers/PostbackController";

const postbackRoutes = Router();

postbackRoutes.post("/pagarme", PostbackController.pagarme);

export default postbackRoutes;
