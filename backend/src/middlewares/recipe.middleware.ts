import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/http.errors";

export const validateIngredients = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { ingredients } = req.body;

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    throw new BadRequestError("Debes proporcionar una lista de ingredientes.");
  }

  const invalidItem = ingredients.find(
    (item) => typeof item !== "string" || item.trim() === ""
  );

  if (invalidItem) {
    throw new BadRequestError(
      "Todos los ingredientes deben ser strings no vacíos."
    );
  }

  next();
};
