export const RecipeSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    ingredients: {
      type: "array",
      items: { type: "string" },
    },
    steps: {
      type: "array",
      items: { type: "string" },
    },
    macros: {
      type: "object",
      properties: {
        calories: { type: "number" },
        protein: { type: "number" },
        carbs: { type: "number" },
        fat: { type: "number" },
      },
      required: ["calories", "protein", "carbs", "fat"],
      additionalProperties: false,
    },
  },
  required: ["title", "ingredients", "steps", "macros"],
  additionalProperties: false,
};
