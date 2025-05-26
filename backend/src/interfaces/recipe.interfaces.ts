export interface Recipe {
  title: string;
  ingredients: string[];
  steps: string[];
  macros: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}
