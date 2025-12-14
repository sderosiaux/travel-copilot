'use client'

import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import type { Meal } from '@/types/meals'
import { Utensils, Leaf, Clock, Check } from 'lucide-react'

interface MealCardProps {
  meal: Meal
  selected?: boolean
  onSelect?: () => void
  showPrice?: boolean
  disabled?: boolean
}

const dietaryLabels: Record<string, string> = {
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  gluten_free: 'Gluten Free',
  halal: 'Halal',
  kosher: 'Kosher',
  low_sodium: 'Low Sodium',
  diabetic: 'Diabetic',
  nut_free: 'Nut Free',
  dairy_free: 'Dairy Free',
  seafood_free: 'No Seafood',
}

const mealTypeLabels: Record<string, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
}

export function MealCard({ meal, selected, onSelect, showPrice = false, disabled = false }: MealCardProps) {
  return (
    <Card
      className={`transition-all hover:shadow-md ${
        selected ? 'ring-2 ring-accent-primary' : ''
      } ${disabled ? 'opacity-50' : ''}`}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Utensils className="h-4 w-4 text-icon-secondary" />
              {meal.name}
            </CardTitle>
            <CardDescription className="mt-1">
              {mealTypeLabels[meal.type]} • {meal.cuisine.replace('_', ' ')}
            </CardDescription>
          </div>
          {selected && (
            <div className="ml-2 rounded-full bg-accent-primary p-1">
              <Check className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-text-secondary">{meal.description}</p>

        {/* Dietary Options */}
        {meal.dietaryOptions.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {meal.dietaryOptions.map((option) => (
              <Badge key={option} variant="secondary" className="text-xs">
                <Leaf className="mr-1 h-3 w-3" />
                {dietaryLabels[option]}
              </Badge>
            ))}
          </div>
        )}

        {/* Calories */}
        {meal.calories && (
          <div className="flex items-center gap-2 text-xs text-text-tertiary">
            <Clock className="h-3 w-3" />
            <span>{meal.calories} calories</span>
          </div>
        )}

        {/* Allergens */}
        {meal.allergens.length > 0 && (
          <div className="text-xs">
            <span className="font-medium text-text-secondary">Contains: </span>
            <span className="text-text-tertiary">{meal.allergens.join(', ')}</span>
          </div>
        )}

        {/* Price and Select Button */}
        {onSelect && (
          <div className="flex items-center justify-between pt-2">
            {showPrice && meal.price && (
              <span className="text-lg font-semibold text-text-primary">
                {meal.currency} {meal.price.toFixed(2)}
              </span>
            )}
            <Button
              onClick={onSelect}
              disabled={disabled || !meal.available}
              variant={selected ? 'secondary' : 'primary'}
              className="ml-auto"
            >
              {selected ? 'Selected' : meal.available ? 'Select' : 'Unavailable'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
