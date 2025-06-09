import { effect, inject, Injectable, signal } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Recipe } from '@models/recipe.model';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

export enum CollectionNames {
  Recipes = 'recipes',
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private authService = inject(AuthService);
  private firestore = inject(Firestore);
  private recipesSub: Subscription | null = null;

  storedRecipes = signal<Recipe[] | null>(null);

  constructor() {
    effect(() => {
      const user = this.authService.user();
      if (user?.uid) {
        this.getRecipes(user.uid);
      }
    });
  }

  getRecipes(uid?: string) {
    if (this.recipesSub) {
      this.recipesSub.unsubscribe();
    }

    const recipesCollection = collection(
      this.firestore,
      CollectionNames.Recipes,
    );

    const q = query(recipesCollection, where('uid', '==', uid));
    const sub = collectionData(q, { idField: 'id' }) as Observable<Recipe[]>;
    this.recipesSub = sub.subscribe((recipes) =>
      this.storedRecipes.set(recipes || []),
    );
  }

  getRecipeById(id: string): Observable<Recipe> {
    const recipeDoc = doc(this.firestore, `${CollectionNames.Recipes}/${id}`);
    return docData(recipeDoc, { idField: 'id' }) as Observable<Recipe>;
  }

  addRecipe(recipe: Omit<Recipe, 'id'>): Promise<string> {
    const recipesCollection = collection(
      this.firestore,
      CollectionNames.Recipes,
    );

    const newRecipe = {
      ...recipe,
      uid: this.authService.user()?.uid,
      favorite: false,
      createdAt: serverTimestamp(),
    };

    return addDoc(recipesCollection, newRecipe).then((docRef) => docRef.id);
  }

  updateRecipe(id: string, data: Partial<Recipe>): Promise<void> {
    const docRef = doc(this.firestore, `${CollectionNames.Recipes}/${id}`);
    return updateDoc(docRef, data);
  }
}
