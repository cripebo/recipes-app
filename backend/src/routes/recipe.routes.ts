import { Router } from "express";
import RecipeController from "../controllers/recipe.controller";
import { validateIngredients } from "../middlewares/recipe.middleware";

const RecipeRoutes = Router();
const RecipeMiddlewares = [validateIngredients];

// prettier-ignore
RecipeRoutes
    .route("/generate")
    .post(RecipeMiddlewares, RecipeController.generateRecipe);

export default RecipeRoutes;
