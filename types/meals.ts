export type DietaryOption =
  | 'vegetarian'
  | 'vegan'
  | 'gluten_free'
  | 'halal'
  | 'kosher'
  | 'low_sodium'
  | 'diabetic'
  | 'nut_free'
  | 'dairy_free'
  | 'seafood_free'

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export type MealCuisine = 'western' | 'asian' | 'middle_eastern' | 'vegetarian' | 'international'

export interface Meal {
  id: string
  name: string
  description: string
  type: MealType
  cuisine: MealCuisine
  dietaryOptions: DietaryOption[]
  ingredients: string[]
  allergens: string[]
  calories?: number
  imageUrl?: string
  price?: number
  currency?: string
  available: boolean
}

export interface MealPreorder {
  id: string
  flightId: string
  travelerId: string
  mealId: string
  meal: Meal
  orderDate: string
  specialRequests?: string
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export interface FlightMealService {
  flightId: string
  flightNumber: string
  route: string
  departureDate: string
  availableMeals: Meal[]
  preorderDeadline: string
  serviceType: 'full_service' | 'buy_on_board' | 'complimentary'
}
