import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  HlmCardContentDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';

type Steps = {
  title: string;
  description: string;
};

@Component({
  selector: 'app-recipe-steps',
  imports: [
    HlmCardContentDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
  ],
  template: `
    <section hlmCard>
      <div hlmCardHeader>
        <h3 hlmCardTitle>Instructions</h3>
      </div>
      <div hlmCardContent>
        <ul class="flex flex-col gap-6 px-6">
          @for (step of steps(); track $index) {
            <li>
              <div class="flex flex-row items-center gap-2">
                <span class="text-lg font-bold">Step {{ $index + 1 }}: </span>
                <p class="text-lg">{{ step.title }}</p>
              </div>
              <p class="text-base text-gray-400">{{ step.description }}</p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeStepsComponent {
  steps = input.required<Steps[]>();
}
