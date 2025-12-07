export interface Nutrition {
  calories: number;
  protein: number;
  fats: number;
  carbs: number;
}

export interface Meal {
  name: string;
  time: string;
  nutrition: Nutrition;
  ingredients: string[];
  benefits: string;
  productsCost: number;
  markup: number;
  finalPrice: number;
}

export interface DailyMenu {
  meals: Meal[];
  totalNutrition: Nutrition;
  totalProductsCost: number;
  totalMarkup: number;
  pricePerDay: number;
  pricePerWeek: number;
  oldPricePerWeek: number;
}

export interface PlanDetails {
  id: string;
  title: string;
  calories: string;
  emoji: string;
  description: string;
  macros: {
    protein: string;
    fats: string;
    carbs: string;
  };
  benefits: string[];
  dailyMenu: DailyMenu;
}
