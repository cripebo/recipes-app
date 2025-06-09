import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';
import { Recipe } from '@models/recipe.model';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { RecipeDetailsComponent } from '../recipeDetails/recipeDetails.component';

@Component({
  selector: 'app-recipe-dialog',
  imports: [RecipeDetailsComponent],
  template: `
    <div class="max-h-[100vh] scroll-hide sm:max-h-[90vh] overflow-y-auto">
      <div>
        <app-recipe-details [recipe]="recipe" />
      </div>
    </div>
  `,
  styles: `
    :host ::ng-deep button[hlmdialogclose] {
      cursor: pointer !important;
    }

    .scroll-hide {
      overflow-y: scroll;
      scrollbar-width: none; /* Firefox */
    }

    .scroll-hide::-webkit-scrollbar {
      display: none; /* Chrome, Safari */
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDialogComponent {
  @HostBinding('class') private readonly _class: string = 'flex flex-col gap-4';

  private readonly _dialogRef = inject<BrnDialogRef<Recipe>>(BrnDialogRef);
  private readonly _dialogContext = injectBrnDialogContext<{
    recipe: Recipe;
  }>();

  protected readonly recipe = this._dialogContext.recipe;

  public selectUser(recipe: Recipe) {
    this._dialogRef.close(recipe);
  }

  public close() {
    this._dialogRef.close();
  }
}
