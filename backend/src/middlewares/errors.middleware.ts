import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/http.errors";
import { AIError } from "../errors/ai.errors";

export const errorsMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpError) {
    console.log(`[Error] [${err.name}] => ${err.message}`);
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof AIError) {
    console.log(`[Error] AI [${err.name}] => ${err.message}`);
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.log(`[Error] [INTERNAL] => No handled error`);
  res.status(500).json({ error: `Internal server error` });
};
