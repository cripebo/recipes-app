import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IngredientsService } from '../../services/ingredientsService.service';
import { IngredientItemComponent } from '../ingredientItem/ingredientItem.component';
import {
  fadeIn,
  fadeInLeft,
  fadeOutRight,
} from '../../animations/general.animations';

@Component({
  selector: 'app-ingredients-list',
  imports: [IngredientItemComponent],
  template: `
    <ul class="flex flex-col md:flex-row flex-wrap gap-2">
      @for (ingredient of ingredientList(); track ingredient) {
        <li @fadeInLeft @fadeOutRight>
          <app-ingredient-item
            [ingredient]="ingredient"
            (onDelete)="ingredientsSrv.deleteFromList($event)"
          />
        </li>
      } @empty {
        <p @fadeIn class="text-gray-500 italic">
          Nothing in your fridge at this moment. Type some ingredients above and
          press Enter to add them.
        </p>
      }
    </ul>
  `,
  styleUrl: './ingredientsList.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInLeft, fadeOutRight, fadeIn],
})
export class IngredientsListComponent {
  ingredientsSrv = inject(IngredientsService);
  ingredientList = this.ingredientsSrv.ingredientList;
}
