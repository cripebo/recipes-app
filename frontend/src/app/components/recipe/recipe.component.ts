import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { RecipeMacrosComponent } from '../recipeMacros/recipeMacros.component';
import { RecipeIngredientsComponent } from '../recipeIngredients/recipeIngredients.component';
import { RecipeStepsComponent } from '../recipeSteps/recipeSteps.component';
import { ErrorAlertComponent } from '../errorAlert/errorAlert.component';

@Component({
  selector: 'app-recipe',
  imports: [
    RecipeMacrosComponent,
    RecipeIngredientsComponent,
    RecipeStepsComponent,
    ErrorAlertComponent,
  ],
  templateUrl: './recipe.component.html',
  animations: [
    trigger('feedLoading', [
      transition(':enter', [
        style({ height: '0', opacity: '0', transform: 'translateY(-16px)' }),
        animate(
          '.3s ease-in',
          style({ height: '*', opacity: '1', transform: 'translateY(0px)' }),
        ),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: '1', transform: 'translateY(0px)' }),
        animate(
          '.2s ease-in',
          style({ height: '0', opacity: '0', transform: 'translateY(-16px)' }),
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeComponent {
  recipeSrv = inject(RecipeService);

  recipe = this.recipeSrv.recipe;
}
