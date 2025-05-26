import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import {
  HlmCardContentDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
  HlmCardFooterDirective,
} from '@spartan-ng/ui-card-helm';
import { LucideAngularModule, TimerIcon } from 'lucide-angular';

type Steps = {
  title: string;
  description: string;
  durationMinutes: number;
};

@Component({
  selector: 'app-recipe-steps',
  imports: [
    HlmCardContentDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardFooterDirective,
    LucideAngularModule,
  ],
  template: `
    <section hlmCard>
      <div hlmCardHeader>
        <h3 hlmCardTitle>Instructions</h3>
      </div>
      <div hlmCardContent>
        <ul class="flex flex-col gap-6">
          @for (step of steps(); track $index) {
            <li>
              <div class="flex flex-row items-center gap-2 border-b mb-2">
                <span class="text-base font-bold">Step {{ $index + 1 }}: </span>
                <p class="text-base">{{ step.title }}</p>
              </div>
              <p class="text-base text-gray-400">{{ step.description }}</p>
              <p class="flex flex-row gap-2 items-center text-sm pt-2">
                <i-lucide
                  [img]="TimerIcon"
                  class="my-icon"
                  [size]="'16'"
                ></i-lucide>
                {{ step.durationMinutes }} min
              </p>
            </li>
          }
        </ul>
      </div>
      <p hlmCardFooter>
        <span class="font-bold">Total time: </span
        ><span>{{ totalDuration() }} minutes </span>
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeStepsComponent {
  readonly TimerIcon = TimerIcon;
  steps = input.required<Steps[]>();
  totalDuration = computed(() =>
    this.steps().reduce((sum, step) => sum + (step.durationMinutes || 0), 0),
  );
}
