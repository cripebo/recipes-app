import { computed, inject, Injectable, signal } from '@angular/core';
import { IngredientsService } from './ingredientsService.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, finalize, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = environment.BASE_API_UPL;
  private http = inject(HttpClient);
  private ingredientsSrv = inject(IngredientsService);

  private _recipe = signal<any | null>(null);
  private _loading = signal(false);
  readonly recipe = computed(() => this._recipe());
  readonly hasRecipe = computed(() => this._recipe() !== null);
  readonly loading = computed(() => this._loading());

  generateRecipe() {
    if (this.loading()) return;

    const ingredients = this.ingredientsSrv.ingredientList();

    if (!ingredients.length) return;

    this._recipe.set(null);
    this._loading.set(true);
    this.http
      .post(`${this.apiUrl}/recipe/generate`, { ingredients })
      .pipe(
        catchError((err) => {
          console.log(err);
          return of(null);
        }),
        finalize(() => this._loading.set(false)),
      )
      .subscribe((recipe) => this._recipe.set(recipe));
  }
}
