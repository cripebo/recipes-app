import OpenAI from "openai";
import { BadResponseAIError } from "../errors/ai.errors";
import { buildRecipePrompt } from "../prompts/recipe.prompt";
import { RecipeSchema } from "../schemas/recipe.schema";
import { ValidAIResponse } from "../interfaces/openai.interfaces";
import { RecipeProvider } from "../interfaces/recipeProvider.interface";
import { ResponsesModel } from "openai/resources/shared";

export class OpenAIService implements RecipeProvider {
  private readonly model: ResponsesModel = "gpt-4o-mini";
  private readonly openai: OpenAI;

  constructor() {
    const config = { apiKey: process.env.OPENAI_API_KEY };
    this.openai = new OpenAI(config);
  }

  async generateRecipe(ingredients: string[]) {
    const { system, user } = buildRecipePrompt(ingredients);
    const recipe = await this.callOpenAI(system, user, RecipeSchema);
    return recipe;
  }

  private async callOpenAI(
    systemPrompt: string,
    userPrompt: string,
    schema: any
  ) {
    const res = await this.openai.responses.create({
      model: this.model,
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "recipe_response",
          schema: schema,
          strict: true,
        },
      },
    });

    if (this.invalidStatus(res.status)) {
      throw new BadResponseAIError("Not a complete response");
    }

    return this.getDataFromResponse(res);
  }

  private invalidStatus(status: OpenAI.Responses.ResponseStatus | undefined) {
    return status !== "completed";
  }

  private getDataFromResponse(res: OpenAI.Responses.Response) {
    const data = res.output[0] as ValidAIResponse;
    return data.content[0].text;
  }
}
