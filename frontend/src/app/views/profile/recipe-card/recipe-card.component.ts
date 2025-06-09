import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Recipe } from '@models/recipe.model';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import {
  Carrot,
  FlameIcon,
  LucideAngularModule,
  StarIcon,
  TimerIcon,
} from 'lucide-angular';
import { FirestoreService } from '../../../services/firestore.service';
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';
import { RecipeDialogComponent } from '../../../components/recipeDialog/recipeDialog.component';
import { RecipeCardResumeComponent } from './recipe-card-macros/recipe-card-macros.component';

@Component({
  selector: 'app-recipe-card',
  imports: [
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,
    LucideAngularModule,
    DatePipe,
    RecipeCardResumeComponent,
  ],
  template: `
    <section hlmCard class>
      <div
        hlmCardHeader
        class="py-0 pt-2 pb-1 flex flex-row px-3 md:px-6 items-center"
      >
        <h3
          hlmCardTitle
          class="flex-1 line-clamp-2 cursor-pointer hover:underline hover:underline-offset-4 pb-1"
          (click)="viewRecipe()"
        >
          {{ recipe().title }}
        </h3>
        @if (recipe().favorite) {
          <button (click)="setFavorite(false)">
            <i-lucide
              [img]="StarIcon"
              class="stroke-primary cursor-pointer fill-primary hover:fill-gray-400 hover:stroke-gray-400 hover:opacity-80"
              size="16"
            ></i-lucide>
          </button>
        } @else {
          <button (click)="setFavorite(true)">
            <i-lucide
              [img]="StarIcon"
              class="stroke-primary cursor-pointer hover:fill-gray-400 hover:stroke-gray-400 hover:opacity-80"
              size="16"
            ></i-lucide>
          </button>
        }
      </div>
      <div hlmCardContent class="pb-2 px-3 md:px-6">
        <app-recipe-card-resume
          [calories]="recipe().macros.calories"
          [time]="calculateTotalTime(recipe().steps)"
          [ingredientsCount]="recipe().ingredients.length"
        />
      </div>
      <div hlmCardFooter class="justify-between py-0 px-3 md:px-6">
        <div>
          <span class="text-xs text-gray-400">{{
            recipe().createdAt.toDate() | date: 'd MMM y'
          }}</span>
        </div>
        <button
          hlmBtn
          variant="link"
          class="cursor-pointer px-0"
          (click)="viewRecipe()"
        >
          View recipe
        </button>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCardComponent {
  private firestoreService = inject(FirestoreService);
  private readonly _hlmDialogService = inject(HlmDialogService);

  readonly StarIcon = StarIcon;
  recipe = input.required<Recipe>();

  calculateTotalTime(steps: { durationMinutes: number }[]) {
    return steps.reduce((acc, val) => {
      return acc + val.durationMinutes;
    }, 0);
  }

  setFavorite(favorite: boolean) {
    this.firestoreService.updateRecipe(this.recipe().id!, { favorite });
  }

  viewRecipe() {
    const dialogRef = this._hlmDialogService.open(RecipeDialogComponent, {
      context: {
        recipe: this.recipe(),
      },
      contentClass: 'sm:!max-w-[1024px]',
    });

    dialogRef.closed$.subscribe((recipe) => {
      if (recipe) {
        console.log('Selected recipe:', recipe);
      }
    });
  }
}
