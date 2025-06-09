import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';

import { LucideAngularModule } from 'lucide-angular';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { Recipe } from '@models/recipe.model';
import { PaginationComponent } from '../../../components/pagination/pagination.component';

@Component({
  selector: 'app-profile-recipes-list',
  imports: [RecipeCardComponent, LucideAngularModule, PaginationComponent],
  template: `
    <div class="flex flex-col gap-2">
      @for (recipe of visibleRecipes(); track $index) {
        <app-recipe-card [recipe]="recipe" />
      } @empty {
        <div>
          <p class="text-muted-foreground text-sm">{{ emptyMessage() }}</p>
        </div>
      }
    </div>
    @if (recipes()) {
      <div class="pt-4 flex justify-center">
        <app-pagination
          [totalItems]="totalRecipesLength()"
          [(currentPage)]="currentPage"
          [perPage]="perPage()"
        />
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileRecipesListComponent {
  perPage = input(5);
  recipes = input<Recipe[]>([]);
  visibleRecipes = computed(() =>
    this.recipes()?.slice(
      (this.currentPage() - 1) * this.perPage(),
      this.currentPage() * this.perPage(),
    ),
  );
  totalRecipesLength = computed(() => this.recipes().length);
  currentPage = model(1);
  emptyMessage = input('No items on list');
}
