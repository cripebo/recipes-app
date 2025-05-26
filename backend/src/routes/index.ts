import { Router } from "express";
import RecipeRoutes from "./recipe.routes";

const router = Router();

router.use("/recipe", RecipeRoutes);

export default router;
