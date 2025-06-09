import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  FlameIcon,
  TimerIcon,
  Carrot,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-recipe-card-resume',
  imports: [LucideAngularModule],
  template: `
    <div class="flex flex-row flex-wrap items-center gap-y-0.5 gap-4">
      <div class="flex flex-row gap-1 items-center text-gray-400 text-sm">
        <i-lucide [img]="FlameIcon" class="my-icon" [size]="'16'"></i-lucide>
        <span> {{ calories() }} kcal </span>
      </div>
      <div class="flex flex-row gap-1 items-center text-gray-400 text-sm">
        <i-lucide [img]="TimerIcon" class="my-icon" [size]="'16'"></i-lucide>
        <span> {{ time() }} minutes </span>
      </div>
      <div class="flex flex-row gap-1 items-center text-gray-400 text-sm">
        <i-lucide [img]="CarrotIcon" class="my-icon" [size]="'16'"></i-lucide>
        <span> {{ ingredientsCount() }} ingredients </span>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCardResumeComponent {
  readonly FlameIcon = FlameIcon;
  readonly TimerIcon = TimerIcon;
  readonly CarrotIcon = Carrot;

  calories = input(0);
  time = input(0);
  ingredientsCount = input(0);
}
