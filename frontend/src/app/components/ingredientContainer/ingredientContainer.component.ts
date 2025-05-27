import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { IngredientsListComponent } from '../ingredientsList/ingredientsList.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { IngredientsService } from '../../services/ingredientsService.service';
import { RecipeService } from '../../services/recipe.service';
import { HlmSpinnerComponent } from '../../../../libs/ui/ui-spinner-helm/src/lib/hlm-spinner.component';
import { fadeInBottom } from '../../animations/general.animations';

@Component({
  selector: 'app-ingredient-container',
  imports: [IngredientsListComponent, HlmButtonDirective, HlmSpinnerComponent],
  template: `
    @if (ingredientsSrv.hasIngredients()) {
      <div @fadeInBottom class="ingredients-container flex flex-col gap-4">
        <div class="ingredients-action flex">
          <button
            hlmBtn
            class="px-3 cursor-pointer md:w-full max-w-[140px] flex gap-1"
            [disabled]="recipeSrv.loading()"
            (click)="recipeSrv.generateRecipe()"
          >
            {{ recipeSrv.loading() ? 'Generating' : 'Generate recipe' }}
            @if (recipeSrv.loading()) {
              <hlm-spinner size="xs" />
            }
          </button>
        </div>
        <div class="ingredients-list">
          <app-ingredients-list />
        </div>
      </div>
    }
  `,
  styleUrl: './ingredientContainer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInBottom],
})
export class IngredientContainerComponent {
  recipeSrv = inject(RecipeService);
  ingredientsSrv = inject(IngredientsService);
}
