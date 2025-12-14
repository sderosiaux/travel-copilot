import type { Meal, MealPreorder, FlightMealService } from '@/types/meals'

// Available meals
export const availableMeals: Meal[] = [
  // Breakfast options
  {
    id: 'meal-breakfast-001',
    name: 'Continental Breakfast',
    description: 'Fresh croissant, fruit salad, yogurt, and orange juice',
    type: 'breakfast',
    cuisine: 'western',
    dietaryOptions: ['vegetarian'],
    ingredients: ['croissant', 'seasonal fruits', 'yogurt', 'orange juice', 'butter', 'jam'],
    allergens: ['gluten', 'dairy'],
    calories: 450,
    imageUrl: '/images/meals/continental-breakfast.jpg',
    price: 12.50,
    currency: 'GBP',
    available: true,
  },
  {
    id: 'meal-breakfast-002',
    name: 'Japanese Breakfast',
    description: 'Grilled salmon, miso soup, rice, and pickled vegetables',
    type: 'breakfast',
    cuisine: 'asian',
    dietaryOptions: ['gluten_free', 'dairy_free'],
    ingredients: ['salmon', 'miso', 'rice', 'pickled vegetables', 'nori'],
    allergens: ['fish', 'soy'],
    calories: 520,
    imageUrl: '/images/meals/japanese-breakfast.jpg',
    price: 15.00,
    currency: 'GBP',
    available: true,
  },
  {
    id: 'meal-breakfast-003',
    name: 'Vegan Power Bowl',
    description: 'Quinoa, avocado, roasted vegetables, and tahini dressing',
    type: 'breakfast',
    cuisine: 'vegetarian',
    dietaryOptions: ['vegan', 'gluten_free', 'dairy_free', 'nut_free'],
    ingredients: ['quinoa', 'avocado', 'bell peppers', 'spinach', 'tahini', 'lemon'],
    allergens: ['sesame'],
    calories: 380,
    imageUrl: '/images/meals/vegan-power-bowl.jpg',
    price: 13.00,
    currency: 'GBP',
    available: true,
  },

  // Lunch/Dinner options
  {
    id: 'meal-dinner-001',
    name: 'Grilled Chicken with Vegetables',
    description: 'Herb-marinated chicken breast with seasonal roasted vegetables and garlic mash',
    type: 'dinner',
    cuisine: 'western',
    dietaryOptions: ['gluten_free', 'dairy_free'],
    ingredients: ['chicken breast', 'carrots', 'broccoli', 'potatoes', 'herbs', 'olive oil'],
    allergens: [],
    calories: 620,
    imageUrl: '/images/meals/grilled-chicken.jpg',
    price: 18.50,
    currency: 'GBP',
    available: true,
  },
  {
    id: 'meal-dinner-002',
    name: 'Pan-Seared Salmon',
    description: 'Atlantic salmon with lemon butter sauce, asparagus, and wild rice',
    type: 'dinner',
    cuisine: 'western',
    dietaryOptions: ['gluten_free'],
    ingredients: ['salmon', 'asparagus', 'wild rice', 'butter', 'lemon', 'dill'],
    allergens: ['fish', 'dairy'],
    calories: 680,
    imageUrl: '/images/meals/salmon.jpg',
    price: 22.00,
    currency: 'GBP',
    available: true,
  },
  {
    id: 'meal-dinner-003',
    name: 'Beef Tenderloin',
    description: 'Prime beef tenderloin with red wine reduction, truffle mash, and green beans',
    type: 'dinner',
    cuisine: 'western',
    dietaryOptions: ['gluten_free'],
    ingredients: ['beef tenderloin', 'red wine', 'truffle', 'potatoes', 'green beans', 'shallots'],
    allergens: ['dairy'],
    calories: 750,
    imageUrl: '/images/meals/beef-tenderloin.jpg',
    price: 28.00,
    currency: 'GBP',
    available: true,
  },
  {
    id: 'meal-dinner-004',
    name: 'Thai Green Curry',
    description: 'Aromatic green curry with vegetables, tofu, and jasmine rice',
    type: 'dinner',
    cuisine: 'asian',
    dietaryOptions: ['vegan', 'gluten_free', 'dairy_free'],
    ingredients: ['green curry paste', 'coconut milk', 'tofu', 'vegetables', 'thai basil', 'jasmine rice'],
    allergens: [],
    calories: 540,
    imageUrl: '/images/meals/thai-curry.jpg',
    price: 16.50,
    currency: 'GBP',
    available: true,
  },
  {
    id: 'meal-dinner-005',
    name: 'Mediterranean Mezze Platter',
    description: 'Hummus, falafel, tabbouleh, stuffed vine leaves, and pita bread',
    type: 'lunch',
    cuisine: 'middle_eastern',
    dietaryOptions: ['vegan', 'dairy_free'],
    ingredients: ['chickpeas', 'tahini', 'bulgur', 'vine leaves', 'tomatoes', 'mint', 'pita'],
    allergens: ['gluten', 'sesame'],
    calories: 580,
    imageUrl: '/images/meals/mezze-platter.jpg',
    price: 17.00,
    currency: 'GBP',
    available: true,
  },
  {
    id: 'meal-dinner-006',
    name: 'Pasta Primavera',
    description: 'Fresh pasta with seasonal vegetables in light garlic and herb sauce',
    type: 'dinner',
    cuisine: 'western',
    dietaryOptions: ['vegetarian'],
    ingredients: ['pasta', 'zucchini', 'cherry tomatoes', 'garlic', 'basil', 'parmesan'],
    allergens: ['gluten', 'dairy'],
    calories: 520,
    imageUrl: '/images/meals/pasta-primavera.jpg',
    price: 15.50,
    currency: 'GBP',
    available: true,
  },

  // Snacks
  {
    id: 'meal-snack-001',
    name: 'Fresh Fruit Plate',
    description: 'Seasonal fruit selection with honey yogurt dip',
    type: 'snack',
    cuisine: 'international',
    dietaryOptions: ['vegetarian', 'gluten_free', 'nut_free'],
    ingredients: ['strawberries', 'melon', 'grapes', 'pineapple', 'yogurt', 'honey'],
    allergens: ['dairy'],
    calories: 180,
    imageUrl: '/images/meals/fruit-plate.jpg',
    price: 8.00,
    currency: 'GBP',
    available: true,
  },
  {
    id: 'meal-snack-002',
    name: 'Cheese & Crackers',
    description: 'Selection of artisan cheeses with crackers and grapes',
    type: 'snack',
    cuisine: 'western',
    dietaryOptions: ['vegetarian'],
    ingredients: ['cheddar', 'brie', 'crackers', 'grapes', 'walnuts'],
    allergens: ['dairy', 'gluten', 'nuts'],
    calories: 320,
    imageUrl: '/images/meals/cheese-crackers.jpg',
    price: 10.00,
    currency: 'GBP',
    available: true,
  },
]

// Flight meal services
export const flightMealServices: FlightMealService[] = [
  {
    flightId: 'flight-ba5-20251115',
    flightNumber: 'BA5',
    route: 'LHR → HND',
    departureDate: '2025-11-15T13:45:00Z',
    availableMeals: [
      availableMeals[0], // Continental Breakfast
      availableMeals[1], // Japanese Breakfast
      availableMeals[3], // Grilled Chicken
      availableMeals[4], // Salmon
      availableMeals[5], // Beef
      availableMeals[6], // Thai Curry
      availableMeals[9], // Fruit Plate
    ],
    preorderDeadline: '2025-11-13T23:59:59Z',
    serviceType: 'complimentary',
  },
  {
    flightId: 'flight-ba6-20251122',
    flightNumber: 'BA6',
    route: 'HND → LHR',
    departureDate: '2025-11-22T11:10:00+09:00',
    availableMeals: [
      availableMeals[1], // Japanese Breakfast
      availableMeals[2], // Vegan Bowl
      availableMeals[3], // Grilled Chicken
      availableMeals[4], // Salmon
      availableMeals[7], // Mediterranean
      availableMeals[8], // Pasta
      availableMeals[10], // Cheese & Crackers
    ],
    preorderDeadline: '2025-11-20T23:59:59Z',
    serviceType: 'complimentary',
  },
  {
    flightId: 'flight-ba178-20251218',
    flightNumber: 'BA178',
    route: 'JFK → LHR',
    departureDate: '2025-12-18T20:15:00-05:00',
    availableMeals: [
      availableMeals[0], // Continental Breakfast
      availableMeals[3], // Grilled Chicken
      availableMeals[4], // Salmon
      availableMeals[5], // Beef
      availableMeals[9], // Fruit Plate
    ],
    preorderDeadline: '2025-12-16T23:59:59Z',
    serviceType: 'complimentary',
  },
]

// Meal pre-orders
export const mealPreorders: MealPreorder[] = [
  {
    id: 'preorder-001',
    flightId: 'flight-ba5-20251115',
    travelerId: 'user-carlos-001',
    mealId: 'meal-dinner-004',
    meal: availableMeals[4], // Salmon
    orderDate: '2025-11-10T15:30:00Z',
    specialRequests: 'No butter sauce, please',
    status: 'confirmed',
    createdAt: '2025-11-10T15:30:00Z',
    updatedAt: '2025-11-10T15:35:00Z',
  },
  {
    id: 'preorder-002',
    flightId: 'flight-ba5-20251115',
    travelerId: 'family-maria-001',
    mealId: 'meal-dinner-006',
    meal: availableMeals[6], // Thai Curry
    orderDate: '2025-11-10T15:30:00Z',
    status: 'confirmed',
    createdAt: '2025-11-10T15:30:00Z',
    updatedAt: '2025-11-10T15:35:00Z',
  },
  {
    id: 'preorder-003',
    flightId: 'flight-ba5-20251115',
    travelerId: 'family-diego-001',
    mealId: 'meal-dinner-003',
    meal: availableMeals[3], // Grilled Chicken
    orderDate: '2025-11-10T15:32:00Z',
    status: 'confirmed',
    createdAt: '2025-11-10T15:32:00Z',
    updatedAt: '2025-11-10T15:35:00Z',
  },
]

export const mockMeals = {
  availableMeals,
  flightMealServices,
  mealPreorders,
}
