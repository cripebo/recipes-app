import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  private _ingredientsList = signal<string[]>([]);
  readonly ingredientList = computed(() => this._ingredientsList());
  readonly hasIngredients = computed(() => this._ingredientsList().length);

  addToList(ingredient: string) {
    this._ingredientsList.update((list) => [...list, ingredient]);
  }

  deleteFromList(ingredient: string) {
    this._ingredientsList.update((list) => {
      return list.filter((el) => el !== ingredient);
    });
  }
}
