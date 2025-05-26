import { computed, inject, Injectable, signal } from '@angular/core';
import { IngredientsService } from './ingredientsService.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  apiUrl = environment.BASE_API_UPL;
  http = inject(HttpClient);
  ingredientsSrv = inject(IngredientsService);

  private _recipe = signal<any | null>(null);
  readonly recipe = computed(() => this._recipe());
  readonly hasRecipe = computed(() => this._recipe() !== null);

  generateRecipe() {
    const ingredients = this.ingredientsSrv.ingredientList();

    if (!ingredients.length) return;

    this.http
      .post(`${this.apiUrl}/recipe/generate`, { ingredients })
      .pipe(
        catchError((err) => {
          console.log(err);
          return of(null);
        }),
      )
      .subscribe((recipe) => console.log(recipe));
  }
}
