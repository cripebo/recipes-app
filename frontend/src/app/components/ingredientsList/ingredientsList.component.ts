import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IngredientsService } from '../../services/ingredientsService.service';
import { IngredientItemComponent } from '../ingredientItem/ingredientItem.component';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-ingredients-list',
  imports: [IngredientItemComponent],
  template: `
    <ul class="flex flex-col md:flex-row flex-wrap gap-2">
      @for (ingredient of ingredientList(); track $index) {
        <li>
          <app-ingredient-item
            [ingredient]="ingredient"
            (onDelete)="ingredientsSrv.deleteFromList($event)"
          />
        </li>
      }
    </ul>
  `,
  styleUrl: './ingredientsList.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsListComponent {
  ingredientsSrv = inject(IngredientsService);
  ingredientList = this.ingredientsSrv.ingredientList;
}
