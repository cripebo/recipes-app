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
import { Eraser, LucideAngularModule, Utensils } from 'lucide-angular';

@Component({
  selector: 'app-ingredient-container',
  imports: [
    IngredientsListComponent,
    HlmButtonDirective,
    HlmSpinnerComponent,
    LucideAngularModule,
  ],
  template: `
    <div @fadeInBottom class="ingredients-container flex flex-col gap-4">
      @if (ingredientsSrv.hasIngredients()) {
        <div class="ingredients-action flex gap-2">
          <button
            hlmBtn
            class="px-3 cursor-pointer md:w-full max-w-[140px] flex gap-2"
            [disabled]="recipeSrv.loading()"
            (click)="recipeSrv.generateRecipe()"
          >
            @if (recipeSrv.loading()) {
              <hlm-spinner size="xs" />
            } @else {
              <i-lucide
                [img]="UtensilsIcon"
                class="my-icon"
                [size]="'14'"
              ></i-lucide>
            }
            {{ recipeSrv.loading() ? 'Generating' : 'Generate' }}
          </button>
          <button
            hlmBtn
            variant="outline"
            class="px-3 cursor-pointer md:w-full max-w-[140px] flex gap-2"
            [disabled]="recipeSrv.loading()"
            (click)="ingredientsSrv.deleteAllFromList()"
          >
            <i-lucide
              [img]="EraserIcon"
              class="my-icon"
              [size]="'14'"
            ></i-lucide>
            Clear
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
  animations: [fadeInBottom],
})
export class IngredientContainerComponent {
  recipeSrv = inject(RecipeService);
  ingredientsSrv = inject(IngredientsService);

  readonly UtensilsIcon = Utensils;
  readonly EraserIcon = Eraser;
}
