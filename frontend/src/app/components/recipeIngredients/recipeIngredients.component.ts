import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  HlmCardContentDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';

@Component({
  selector: 'app-recipe-ingredients',
  imports: [
    HlmCheckboxComponent,
    HlmCardContentDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
  ],
  template: `
    <section hlmCard>
      <div hlmCardHeader>
        <h3 hlmCardTitle>Ingredients</h3>
      </div>
      <div hlmCardContent>
        <ul class="flex flex-col gap-1 px-6">
          @for (ingredient of ingredients(); track $index) {
            <li class="text-gray-300 flex items-start gap-2 text-pretty">
              <hlm-checkbox class="mt-1" />
              {{ ingredient }}
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeIngredientsComponent {
  ingredients = input.required<string[]>();
}
