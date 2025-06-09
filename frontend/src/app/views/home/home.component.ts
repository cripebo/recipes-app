import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { fadeInTop } from '../../animations/general.animations';
import { HeaderComponent } from '../../components/header/header.component';
import { IngredientAdditionComponent } from '../../components/ingredientAddition/ingredientAddition.component';
import { IngredientContainerComponent } from '../../components/ingredientContainer/ingredientContainer.component';
import { RecipeComponent } from '../../components/recipe/recipe.component';
import { SingleAccordionComponent } from '../../components/singleAccordion/singleAccordion.component';
import { RecipeService } from '../../services/recipe.service';
import { AuthActionsComponent } from "../../components/authActions/authActions.component";

@Component({
  imports: [
    HeaderComponent,
    IngredientContainerComponent,
    RecipeComponent,
    SingleAccordionComponent,
    IngredientAdditionComponent,
    AuthActionsComponent
  ],
  templateUrl: `./home.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInTop],

})
export class HomeComponent {
  recipeSrv = inject(RecipeService);
}
