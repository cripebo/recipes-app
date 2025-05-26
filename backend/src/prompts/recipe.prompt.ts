export const buildRecipePrompt = (ingredients: string[]): string => {
  return `
I have the following ingredients: ${ingredients.join(", ")}.

Before creating the recipe, review the list of ingredients and exclude any items that are inedible, unsafe, or not suitable for human consumption. Do not mention or use any of the excluded ingredients in the recipe.

I want you to act as a professional chef and nutritionist. Create a simple, tasty, and healthy recipe that uses only those ingredients, except for water, salt, and pepper, which you can add freely.

The recipe must include:

Approximate quantities for each ingredient, expressed in easy-to-understand units (grams, cups, tablespoons, units).
Clear, simple, and sequential instructions so that anyone can follow them without difficulty, using basic or slightly advanced cooking techniques (such as baking or sautéing).
An estimated duration for each step, in minutes, to help with time planning.
A basic summary with the estimated nutritional content (calories, protein, carbohydrates, and fat) for the entire recipe.

The recipe should be practical, straightforward, and ideal for people with little cooking experience.
`;
};
