export const RecipeSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    ingredients: {
      type: "array",
      items: { type: "string" },
    },
    steps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
        },
        required: ["title", "description"],
        additionalProperties: false,
      },
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
  required: ["title", "description", "ingredients", "steps", "macros"],
  additionalProperties: false,
};
