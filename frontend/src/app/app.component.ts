import { Component } from '@angular/core';
import { IngredientAdditionComponent } from './components/ingredientAddition/ingredientAddition.component';
import { HeaderComponent } from './components/header/header.component';
import { IngredientsListComponent } from './components/ingredientsList/ingredientsList.component';
import { IngredientContainerComponent } from './components/ingredientContainer/ingredientContainer.component';

@Component({
  selector: 'app-root',
  imports: [
    IngredientAdditionComponent,
    HeaderComponent,
    IngredientsListComponent,
    IngredientContainerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
