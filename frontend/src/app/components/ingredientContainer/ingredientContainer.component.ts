import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { IngredientsListComponent } from '../ingredientsList/ingredientsList.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { IngredientsService } from '../../services/ingredientsService.service';

@Component({
  selector: 'app-ingredient-container',
  imports: [IngredientsListComponent, HlmButtonDirective],
  template: `
    <div class="ingredients-container">
      @if (ingredientsSrv.hasIngredients()) {
        <div class="ingredients-action flex justify-end">
          <button hlmBtn class="px-3 cursor-pointer md:w-full max-w-[140px]">
            {{ actionBtnText() }}
          </button>
        </div>
      }
      <div class="ingredients-list">
        <app-ingredients-list />
      </div>
    </div>
  `,
  styleUrl: './ingredientContainer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientContainerComponent {
  ingredientsSrv = inject(IngredientsService);
  actionBtnText = input('Find recipe');
}
