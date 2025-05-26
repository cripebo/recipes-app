import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-recipe',
  imports: [],
  template: ` <div class="recipe-container"></div> `,
  styleUrl: './recipe.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeComponent {}
