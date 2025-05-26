import { Recipe } from "./recipe.interfaces";

export interface RecipeProvider {
  generateRecipe(ingredients: string[]): Promise<string>;
}
