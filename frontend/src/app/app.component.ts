import { Component, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { IngredientContainerComponent } from './components/ingredientContainer/ingredientContainer.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { fadeInTop } from './animations/general.animations';
import { SingleAccordionComponent } from './components/singleAccordion/singleAccordion.component';
import { IngredientAdditionComponent } from './components/ingredientAddition/ingredientAddition.component';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    IngredientContainerComponent,
    RecipeComponent,
    SingleAccordionComponent,
    IngredientAdditionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [fadeInTop],
})
export class AppComponent {
  recipeSrv = inject(RecipeService);
}
