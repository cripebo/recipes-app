import { Timestamp } from '@angular/fire/firestore';

export interface Recipe {
  id?: string;
  uid?: string;
  createdAt: Timestamp;
  favorite: boolean;
  title: string;
  description: string;
  ingredients: string[];
  steps: Step[];
  macros: Macros;
}

export interface Step {
  title: string;
  description: string;
  durationMinutes: number;
}

export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
