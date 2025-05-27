import { Component } from '@angular/core';
import { IngredientAdditionComponent } from './components/ingredientAddition/ingredientAddition.component';
import { HeaderComponent } from './components/header/header.component';
import { IngredientContainerComponent } from './components/ingredientContainer/ingredientContainer.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { fadeInTop } from './animations/general.animations';

@Component({
  selector: 'app-root',
  imports: [
    IngredientAdditionComponent,
    HeaderComponent,
    IngredientContainerComponent,
    RecipeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [fadeInTop],
})
export class AppComponent {}
