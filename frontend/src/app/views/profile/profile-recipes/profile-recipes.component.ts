import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import {
  HlmTabsComponent,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
  HlmTabsContentDirective,
} from '@spartan-ng/ui-tabs-helm';
import { ProfileRecipesListComponent } from '../profile-recipes-list/profile-recipes-list.component';
import { Recipe } from '@models/recipe.model';
import { FirestoreService } from '../../../services/firestore.service';
import { AuthService } from '../../../services/auth.service';

const DUMMY_DATA = [
  {
    created_at: '2025-06-05T18:56:23.551Z',
    favorite: false,
    title: 'Cheesy Bacon-Pasta Bake',
    description:
      "This simple and delicious Cheesy Bacon-Pasta Bake combines pasta, potatoes, tomatoes, and cheese for a comforting dish that's easy to prepare and perfect for any meal. Enjoy a satisfying blend of flavors with a crunchy topping!",
    ingredients: [
      '200g pasta (fusilli or penne)',
      '150g potatoes, diced',
      '200g tomatoes, chopped',
      '150g cheese, shredded (cheddar or mozzarella)',
      '100g bacon, diced',
      'Salt, to taste',
      'Pepper, to taste',
      '1 tablespoon olive oil (optional)',
    ],
    steps: [
      {
        title: 'Boil the Pasta',
        description:
          'In a large pot, bring water to a boil. Add a pinch of salt and the pasta. Cook according to package instructions until al dente. Drain and set aside.',
        durationMinutes: 10,
      },
      {
        title: 'Prepare the Potatoes',
        description:
          'In a separate pot, bring water to a boil. Add diced potatoes and a pinch of salt. Boil for about 10 minutes until fork-tender. Drain and set aside.',
        durationMinutes: 10,
      },
      {
        title: 'Cook the Bacon',
        description:
          'In a skillet, heat olive oil over medium heat. Add the diced bacon and cook until crispy, about 5-7 minutes. Remove from heat and drain on a paper towel.',
        durationMinutes: 7,
      },
      {
        title: 'Combine Ingredients',
        description:
          'In a large mixing bowl, combine the cooked pasta, potatoes, bacon, chopped tomatoes, and half of the shredded cheese. Season with salt and pepper to taste. Mix well.',
        durationMinutes: 5,
      },
      {
        title: 'Assemble the Bake',
        description:
          'Preheat your oven to 180°C (350°F). Transfer the mixture into a baking dish. Top with the remaining cheese. Bake in the preheated oven for about 20 minutes or until the cheese is bubbly and golden brown.',
        durationMinutes: 20,
      },
      {
        title: 'Serve and Enjoy',
        description:
          'Remove from oven and let cool for a few minutes before serving. Enjoy your Cheesy Bacon-Pasta Bake!',
        durationMinutes: 5,
      },
    ],
    macros: {
      calories: 1030,
      protein: 54,
      carbs: 106,
      fat: 36,
    },
  },
  {
    created_at: '2025-06-04T18:56:23.551Z',
    favorite: false,
    title: 'Pizza peperonni',
    description:
      "This simple and delicious Cheesy Bacon-Pasta Bake combines pasta, potatoes, tomatoes, and cheese for a comforting dish that's easy to prepare and perfect for any meal. Enjoy a satisfying blend of flavors with a crunchy topping!",
    ingredients: [
      '200g pasta (fusilli or penne)',
      '200g tomatoes, chopped',
      '100g bacon, diced',
      'Salt, to taste',
      'Pepper, to taste',
      '1 tablespoon olive oil (optional)',
    ],
    steps: [
      {
        title: 'Prepare the Potatoes',
        description:
          'In a separate pot, bring water to a boil. Add diced potatoes and a pinch of salt. Boil for about 10 minutes until fork-tender. Drain and set aside.',
        durationMinutes: 10,
      },
      {
        title: 'Cook the Bacon',
        description:
          'In a skillet, heat olive oil over medium heat. Add the diced bacon and cook until crispy, about 5-7 minutes. Remove from heat and drain on a paper towel.',
        durationMinutes: 7,
      },
      {
        title: 'Combine Ingredients',
        description:
          'In a large mixing bowl, combine the cooked pasta, potatoes, bacon, chopped tomatoes, and half of the shredded cheese. Season with salt and pepper to taste. Mix well.',
        durationMinutes: 5,
      },
      {
        title: 'Assemble the Bake',
        description:
          'Preheat your oven to 180°C (350°F). Transfer the mixture into a baking dish. Top with the remaining cheese. Bake in the preheated oven for about 20 minutes or until the cheese is bubbly and golden brown.',
        durationMinutes: 20,
      },
      {
        title: 'Serve and Enjoy',
        description:
          'Remove from oven and let cool for a few minutes before serving. Enjoy your Cheesy Bacon-Pasta Bake!',
        durationMinutes: 5,
      },
    ],
    macros: {
      calories: 1430,
      protein: 54,
      carbs: 106,
      fat: 36,
    },
  },
  {
    created_at: '2025-06-05T18:00:23.551Z',
    favorite: true,
    title: 'Cheesy Bacon-Pasta Bake',
    description:
      "This simple and delicious Cheesy Bacon-Pasta Bake combines pasta, potatoes, tomatoes, and cheese for a comforting dish that's easy to prepare and perfect for any meal. Enjoy a satisfying blend of flavors with a crunchy topping!",
    ingredients: [
      '200g pasta (fusilli or penne)',
      '200g tomatoes, chopped',
      '150g cheese, shredded (cheddar or mozzarella)',
      '100g bacon, diced',
      'Pepper, to taste',
      '1 tablespoon olive oil (optional)',
    ],
    steps: [
      {
        title: 'Boil the Pasta',
        description:
          'In a large pot, bring water to a boil. Add a pinch of salt and the pasta. Cook according to package instructions until al dente. Drain and set aside.',
        durationMinutes: 10,
      },
      {
        title: 'Prepare the Potatoes',
        description:
          'In a separate pot, bring water to a boil. Add diced potatoes and a pinch of salt. Boil for about 10 minutes until fork-tender. Drain and set aside.',
        durationMinutes: 10,
      },
      {
        title: 'Cook the Bacon',
        description:
          'In a skillet, heat olive oil over medium heat. Add the diced bacon and cook until crispy, about 5-7 minutes. Remove from heat and drain on a paper towel.',
        durationMinutes: 7,
      },
      {
        title: 'Combine Ingredients',
        description:
          'In a large mixing bowl, combine the cooked pasta, potatoes, bacon, chopped tomatoes, and half of the shredded cheese. Season with salt and pepper to taste. Mix well.',
        durationMinutes: 5,
      },
      {
        title: 'Assemble the Bake',
        description:
          'Preheat your oven to 180°C (350°F). Transfer the mixture into a baking dish. Top with the remaining cheese. Bake in the preheated oven for about 20 minutes or until the cheese is bubbly and golden brown.',
        durationMinutes: 20,
      },
      {
        title: 'Serve and Enjoy',
        description:
          'Remove from oven and let cool for a few minutes before serving. Enjoy your Cheesy Bacon-Pasta Bake!',
        durationMinutes: 5,
      },
    ],
    macros: {
      calories: 1030,
      protein: 54,
      carbs: 106,
      fat: 36,
    },
  },
];

@Component({
  selector: 'app-profile-recipes',
  imports: [
    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    ProfileRecipesListComponent,
  ],
  templateUrl: `./profile-recipes.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileRecipesComponent implements OnInit {
  authService = inject(AuthService);
  firestore = inject(FirestoreService);
  recipes = this.firestore.storedRecipes;
  favoriteRecipes = computed(
    () => this.recipes()?.filter((recipe) => recipe.favorite) ?? [],
  );

  recipesCount = computed(() => this.recipes()?.length || 0);
  favoriteRecipesCount = computed(() => this.favoriteRecipes()?.length || 0);

  ngOnInit(): void {
    //this.firestore.getRecipes(this.authService.user()?.uid);
  }
}
