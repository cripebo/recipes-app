import { BadResponseAIError } from "../errors/ai.errors";
import { Recipe } from "../interfaces/recipe.interfaces";
import { RecipeProvider } from "../interfaces/recipeProvider.interface";

export class RecipeService {
  constructor(private recipeProvider: RecipeProvider) {}

  async generateRecipe(ingredients: string[]) {
    const result = await this.recipeProvider.generateRecipe(ingredients);

    try {
      const parsed = JSON.parse(result) as Recipe;
      return parsed;
    } catch (error) {
      throw new BadResponseAIError();
    }
  }
}
