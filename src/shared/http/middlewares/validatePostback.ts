import { NextFunction, Request, Response } from "express";

import pagarme from "pagarme";
import qs from "qs";

export const validatePostback = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const apiKey = process.env.PAGARME_API_KEY as string;
    const verifyBody = qs.stringify(request.body);

    let signature: any = "";

    if (request.headers["x-hub-signature"]) {
      signature = request.headers["x-hub-signature"].slice(5);
    }

    const verify = pagarme.postback.verifySignature(
      apiKey,
      verifyBody,
      signature
    );

    if (!verify) throw Error;

    return next();
  } catch (err) {
    return response.status(400).json({ message: "Unauthorized" });
  }
};
