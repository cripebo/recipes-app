import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeCardResumeComponent } from './recipe-card-macros.component';

describe('RecipeCardResumeComponent', () => {
  let fixture: ComponentFixture<RecipeCardResumeComponent>;
  let component: RecipeCardResumeComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RecipeCardResumeComponent],
    });

    fixture = TestBed.createComponent(RecipeCardResumeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('calories', 250);
    fixture.componentRef.setInput('time', 30);
    fixture.componentRef.setInput('ingredientsCount', 4);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should display calories with "kcal"', () => {
    const caloriesEl = fixture.nativeElement.textContent;
    expect(caloriesEl).toContain('250 kcal');
  });

  it('should display time with "minutes"', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('30 minutes');
  });

  it('should display number of ingredients', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('4 ingredients');
  });
});
