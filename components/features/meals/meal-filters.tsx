'use client'

import { Badge, Button, Card, CardContent, Label } from '@/components/ui'
import type { DietaryOption } from '@/types/meals'
import { Filter, X } from 'lucide-react'
import { useState } from 'react'

interface MealFiltersProps {
  selectedDietary: DietaryOption[]
  onDietaryChange: (options: DietaryOption[]) => void
  onClear: () => void
}

const dietaryOptions: { value: DietaryOption; label: string }[] = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten_free', label: 'Gluten Free' },
  { value: 'halal', label: 'Halal' },
  { value: 'kosher', label: 'Kosher' },
  { value: 'low_sodium', label: 'Low Sodium' },
  { value: 'diabetic', label: 'Diabetic' },
  { value: 'nut_free', label: 'Nut Free' },
  { value: 'dairy_free', label: 'Dairy Free' },
  { value: 'seafood_free', label: 'No Seafood' },
]

export function MealFilters({ selectedDietary, onDietaryChange, onClear }: MealFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleDietary = (option: DietaryOption) => {
    if (selectedDietary.includes(option)) {
      onDietaryChange(selectedDietary.filter((o) => o !== option))
    } else {
      onDietaryChange([...selectedDietary, option])
    }
  }

  const hasFilters = selectedDietary.length > 0

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-icon-secondary" />
              <Label className="text-sm font-medium">Dietary Preferences</Label>
              {hasFilters && (
                <Badge variant="secondary" className="ml-2">
                  {selectedDietary.length}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={onClear}>
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Show Less' : 'Show More'}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {(isExpanded ? dietaryOptions : dietaryOptions.slice(0, 5)).map((option) => (
              <Badge
                key={option.value}
                variant={selectedDietary.includes(option.value) ? 'primary' : 'secondary'}
                className="cursor-pointer hover:bg-bg-hover transition-colors"
                onClick={() => toggleDietary(option.value)}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
