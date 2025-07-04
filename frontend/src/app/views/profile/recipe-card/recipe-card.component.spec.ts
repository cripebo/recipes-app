import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';
import { of } from 'rxjs';
import { RecipeDialogComponent } from '../../../components/recipeDialog/recipeDialog.component';
import { FirestoreService } from '../../../services/firestore.service';
import { RecipeCardComponent } from './recipe-card.component';
import { Timestamp } from '@angular/fire/firestore';
import { Recipe } from '@models/recipe.model';

describe('RecipeCardComponent', () => {
  let component: RecipeCardComponent;
  let fixture: ComponentFixture<RecipeCardComponent>;
  let firestoreService: jasmine.SpyObj<FirestoreService>;
  let dialogService: jasmine.SpyObj<HlmDialogService>;
  const mockRecipe: Recipe = {
    id: '123',
    title: 'Test Recipe',
    description: 'Una receta de prueba',
    favorite: true,
    createdAt: Timestamp.fromDate(new Date('2024-01-01')),
    macros: {
      calories: 400,
      carbs: 50,
      fat: 10,
      protein: 20,
    },
    steps: [
      { durationMinutes: 10, description: 'Paso 1', title: 'Preparar' },
      { durationMinutes: 20, description: 'Paso 2', title: 'Cocinar' },
    ],
    ingredients: ['Pan', 'Huevo'],
  };

  beforeEach(async () => {
    firestoreService = jasmine.createSpyObj('FirestoreService', [
      'updateRecipe',
    ]);
    dialogService = jasmine.createSpyObj('HlmDialogService', ['open']);

    await TestBed.configureTestingModule({
      imports: [RecipeCardComponent],
      providers: [
        { provide: FirestoreService, useValue: firestoreService },
        { provide: HlmDialogService, useValue: dialogService },
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(RecipeCardComponent);
    fixture.componentRef.setInput('recipe', mockRecipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create RecipeCardComponent', () => {
    expect(component).toBeDefined();
  });

  it('should calculate total time correctly', () => {
    let total = component.calculateTotalTime([
      { durationMinutes: 5 },
      { durationMinutes: 15 },
    ]);
    expect(total).toBe(20);

    total = component.calculateTotalTime([
      { durationMinutes: 1 },
      { durationMinutes: 15 },
      { durationMinutes: 1 },
      { durationMinutes: 10 },
      { durationMinutes: 3 },
    ]);

    expect(total).toBe(30);
  });

  it('should call firestoreService.updateRecipe with correct args', () => {
    component.setFavorite(false);
    expect(firestoreService.updateRecipe).toHaveBeenCalledWith('123', {
      favorite: false,
    });
  });

  it('should open dialog with recipe context', () => {
    const fakeDialogRef = {
      closed$: of(null),
    };
    dialogService.open.and.returnValue(fakeDialogRef as any);

    component.viewRecipe();

    expect(dialogService.open).toHaveBeenCalledWith(RecipeDialogComponent, {
      context: { recipe: component.recipe() },
      contentClass: 'sm:!max-w-[1024px]',
    });
  });

  it('should show title of recipe', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    expect(
      nativeElement.querySelector('h3[hlmCardTitle]')?.textContent,
    ).toContain(mockRecipe.title);
  });
});
