import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';

type Macros = {
  calories: number | string;
  protein: number | string;
  carbs: number | string;
  fat: number | string;
};

@Component({
  selector: 'app-recipe-macros',
  imports: [
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
  ],
  template: `
    <section hlmCard>
      <div hlmCardHeader>
        <h3 hlmCardTitle>Macros</h3>
        <p hlmCardDescription>List of macronutrients for this recipe</p>
      </div>
      <div hlmCardContent>
        <ul class="px-6 divide-y divide-gray-500">
          <li class="flex flex-row justify-between py-2">
            <span>Calories</span>
            <span>{{ macros().calories }} kcal</span>
          </li>
          <li class="flex flex-row justify-between py-2">
            <span>Protein</span>
            <span>{{ macros().protein }} g</span>
          </li>
          <li class="flex flex-row justify-between py-2">
            <span>Carbs</span>
            <span>{{ macros().carbs }} g</span>
          </li>
          <li class="flex flex-row justify-between py-2">
            <span>Fat</span>
            <span>{{ macros().fat }} g</span>
          </li>
        </ul>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeMacrosComponent {
  macros = input.required<Macros>();
}
