import "reflect-metadata"
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import "express-async-errors";
import '../container/';

import { AppError } from "../errors/AppError";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(cors());
app.use("/api", routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
});

export default app;