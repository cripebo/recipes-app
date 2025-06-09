import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Recipe } from '@models/recipe.model';
import { RecipeIngredientsComponent } from '../recipeIngredients/recipeIngredients.component';
import { RecipeMacrosComponent } from '../recipeMacros/recipeMacros.component';
import { RecipeStepsComponent } from '../recipeSteps/recipeSteps.component';

@Component({
  selector: 'app-recipe-details',
  imports: [
    RecipeIngredientsComponent,
    RecipeMacrosComponent,
    RecipeStepsComponent,
  ],
  template: `
    <div class="recipe-container">
      <section class="recipe-title flex flex-col gap-2">
        <h3 class="text-2xl font-bold">{{ recipe().title }}</h3>
        <p class="text-lg text-pretty">{{ recipe().description }}</p>
      </section>

      <div class="flex flex-col md:flex-row justify-around pt-6 gap-6">
        <section class="recipe-ingredients-macros flex flex-col flex-1 gap-8">
          <app-recipe-ingredients [ingredients]="recipe().ingredients" />
          <app-recipe-macros [macros]="recipe().macros" />
        </section>

        <section class="recipe-steps flex flex-col gap-2 flex-1">
          <app-recipe-steps [steps]="recipe().steps" />
        </section>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailsComponent {
  recipe = input.required<Recipe>();
}
