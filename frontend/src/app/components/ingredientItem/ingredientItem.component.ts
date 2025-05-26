import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { LucideAngularModule, XIcon } from 'lucide-angular';

@Component({
  selector: 'app-ingredient-item',
  imports: [LucideAngularModule],
  template: `
    <div
      class="ingredient-item w-full md:w-[185px] gap-4 border border-input font-medium h-10 flex items-center justify-between px-4 py-2 ring-offset-background rounded-md text-default transition-colors"
    >
      <span class="font-medium line-clamp-1" [title]="ingredient()">{{
        ingredient()
      }}</span>
      <button
        type="button"
        class="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring "
        (click)="delete()"
      >
        <i-lucide [img]="XIcon" class="my-icon" [size]="'16'"></i-lucide>
      </button>
    </div>
  `,
  styleUrl: './ingredientItem.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientItemComponent {
  readonly XIcon = XIcon;
  ingredient = input('ingredient');
  onDelete = output<string>();

  delete() {
    this.onDelete.emit(this.ingredient());
  }
}
