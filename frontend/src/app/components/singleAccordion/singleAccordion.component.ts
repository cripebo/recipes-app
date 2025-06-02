import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  HlmAccordionDirective,
  HlmAccordionItemDirective,
  HlmAccordionTriggerDirective,
  HlmAccordionContentComponent,
} from '@spartan-ng/ui-accordion-helm';

import { ChevronDownIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-single-accordion',
  imports: [
    HlmAccordionDirective,
    HlmAccordionItemDirective,
    HlmAccordionTriggerDirective,
    HlmAccordionContentComponent,
    LucideAngularModule,
  ],
  template: `
    <div class="mb-5">
      <div hlmAccordion>
        <div hlmAccordionItem>
          <button hlmAccordionTrigger class="cursor-pointer">
            {{ accTitle() }}

            <i-lucide
              hlm
              hlmAccIcon
              [img]="ChevronDownIcon"
              [size]="accIconSize()"
            ></i-lucide>
          </button>
          <hlm-accordion-content>
            <ng-content></ng-content>
          </hlm-accordion-content>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleAccordionComponent {
  readonly ChevronDownIcon = ChevronDownIcon;

  accTitle = input('This is the title of the accordion');
  accIconSize = input<number | string>(16);
}
