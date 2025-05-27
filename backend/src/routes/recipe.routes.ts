import { Router } from "express";
import RecipeController from "../controllers/recipe.controller";
import { validateIngredients } from "../middlewares/recipe.middleware";
import { rateLimiter } from "../middlewares/rateLimiter.middleware";

const RecipeRoutes = Router();
const RecipeMiddlewares = [rateLimiter, validateIngredients];

// prettier-ignore
RecipeRoutes
    .route("/generate")
    .post(RecipeMiddlewares, RecipeController.generateRecipe);

export default RecipeRoutes;
