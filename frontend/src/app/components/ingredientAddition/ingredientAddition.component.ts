import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { IngredientsService } from '../../services/ingredientsService.service';

@Component({
  selector: 'app-ingredient-addition',
  imports: [HlmButtonDirective, HlmInputDirective, ReactiveFormsModule],
  template: `
    <div class="flex items-center w-full space-x-2">
      <input
        aria-label="Ingredient"
        class="w-full "
        hlmInput
        type="text"
        placeholder="Ingredient"
        [formControl]="inputIngredient"
        (keydown.enter)="add()"
        [maxLength]="INGREDIENT_MAX_LENGTH()"
      />
      <button
        hlmBtn
        class="cursor-pointer md:w-full max-w-[140px]"
        (click)="add()"
      >
        {{ buttonText() }}
      </button>
    </div>
  `,
  styleUrl: './ingredientAddition.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientAdditionComponent {
  ingredientSrv = inject(IngredientsService);
  INGREDIENT_MAX_LENGTH = input(80);
  buttonText = input('Add');
  onAdd = output<string>();

  inputIngredient = new FormControl<string>('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.maxLength(this.INGREDIENT_MAX_LENGTH()),
    ],
  });

  add() {
    if (this.inputIngredient.invalid || !this.inputIngredient.value.trim())
      return;

    this.ingredientSrv.addToList(this.inputIngredient.value);
    this.inputIngredient.reset();
    this.inputIngredient.markAsUntouched();
  }
}
