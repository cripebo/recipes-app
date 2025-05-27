import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  HlmAlertDescriptionDirective,
  HlmAlertDirective,
  HlmAlertIconDirective,
  HlmAlertTitleDirective,
} from '@spartan-ng/ui-alert-helm';
import { CircleAlertIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-error-alert',
  imports: [
    HlmAlertDescriptionDirective,
    HlmAlertDirective,
    HlmAlertTitleDirective,
    HlmAlertIconDirective,

    LucideAngularModule,
  ],
  template: `
    <div hlmAlert>
      <i-lucide
        [img]="icon"
        hlmAlertIcon
        class="my-icon"
        [size]="'16'"
      ></i-lucide>
      <h4 hlmAlertTitle>{{ errorTitle() }}</h4>
      <p hlmAlertDesc>
        {{ errorDescription() }}
      </p>
    </div>
  `,
  styleUrl: './errorAlert.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorAlertComponent {
  readonly icon = CircleAlertIcon;
  errorTitle = input('Oops! Something went wrong');
  errorDescription = input('An error occurred');
}
