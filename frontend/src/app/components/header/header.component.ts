import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <div class="flex flex-col items-center gap-6">
      <h2>What's in your fridge?</h2>
      <h5>Enter ingredients you have and we'll find a recipe for you.</h5>
    </div>
  `,
  styles: `
    h2 {
      font-size: clamp(2rem, 3vw, 5rem);
      text-align: center;
      text-wrap: balance;
    }

    h5 {
      font-size: clamp(1rem, 1.2vw, 3rem);
      text-align: center;
      text-wrap: balance;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
