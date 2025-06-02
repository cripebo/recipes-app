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
  private _error = signal<{ error: string } | null>(null);
  readonly recipe = computed(() => this._recipe());
  readonly loading = computed(() => this._loading());
  readonly error = computed(() => this._error());
  readonly hasRecipe = computed(() => this._recipe() !== null);

  generateRecipe() {
    if (this.loading()) return;

    const ingredients = this.ingredientsSrv.ingredientList();

    if (!ingredients.length) return;

    this._recipe.set(null);
    this._error.set(null);
    this._loading.set(true);
    this.http
      .post(`${this.apiUrl}/recipe/generate`, { ingredients })
      .pipe(
        catchError((err) => {
          if (err.status === 429) {
            this._error.set(err.error);
          } else {
            this._error.set({ error: 'An unexpected error has occurred.' });
          }
          return of(null);
        }),
        finalize(() => this._loading.set(false)),
      )
      .subscribe((recipe) => this._recipe.set(recipe));
  }
}
