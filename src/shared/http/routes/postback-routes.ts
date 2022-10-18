import { Router } from "express";
import { validatePostback } from "../middlewares/validatePostback";
import PostbackController from "../../controllers/PostbackControllers/PostbackController";

const postbackRoutes = Router();

postbackRoutes.post(`/pagarme`, validatePostback, PostbackController.pagarme);

export default postbackRoutes;
