import { NextFunction, Request, Response } from "express";
import { RecipeService } from "../services/recipe.service";
import { OpenAIService } from "../services/openai.service";

const recipeService = new RecipeService(new OpenAIService());

const generateRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ingredients } = req.body;
    const recipe = await recipeService.generateRecipe(ingredients);
    return res.json(recipe);
  } catch (error: any) {
    return next(error);
  }
};

const RecipeController = {
  generateRecipe,
};

export default RecipeController;
