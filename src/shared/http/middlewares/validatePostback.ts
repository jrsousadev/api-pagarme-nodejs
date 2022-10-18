import { NextFunction, Request, Response } from "express";

import pagarme from "pagarme";
import qs from "qs";
import { AppError } from "../../errors/AppError";

export const validatePostback = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const apiKey = process.env.PAGARME_API_KEY as string;
    const verifyBody = qs.stringify(request.body);
    let signature: string = "";

    console.log(request.headers["x-hub-signature"])

    if (request.headers["x-hub-signature"]) {
      const getSignature = request.headers["x-hub-signature"];
      console.log(getSignature)
    }

    const verify = pagarme.postback.verifySignature(
      apiKey,
      verifyBody,
      signature
    );

    if (!verify) return false;

    return next();
  } catch (err) {
    throw new AppError("Unauthorized")
  }
};
