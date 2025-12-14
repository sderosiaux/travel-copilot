'use client'

import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from '@/components/ui'
import type { FlightMealService, Meal, DietaryOption } from '@/types/meals'
import { MealCard } from './meal-card'
import { MealFilters } from './meal-filters'
import { Search, Calendar, Clock, AlertCircle } from 'lucide-react'
import { useState } from 'react'

interface FlightMealSelectorProps {
  service: FlightMealService
  selectedMealId?: string
  onMealSelect: (meal: Meal) => void
  disabled?: boolean
}

export function FlightMealSelector({
  service,
  selectedMealId,
  onMealSelect,
  disabled = false,
}: FlightMealSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDietary, setSelectedDietary] = useState<DietaryOption[]>([])

  // Filter meals based on search and dietary preferences
  const filteredMeals = service.availableMeals.filter((meal) => {
    // Search filter
    const matchesSearch =
      !searchQuery ||
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.cuisine.toLowerCase().includes(searchQuery.toLowerCase())

    // Dietary filter
    const matchesDietary =
      selectedDietary.length === 0 ||
      selectedDietary.some((option) => meal.dietaryOptions.includes(option))

    return matchesSearch && matchesDietary
  })

  const isDeadlinePassed = new Date(service.preorderDeadline) < new Date()

  return (
    <div className="space-y-6">
      {/* Flight Info Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {service.flightNumber} • {service.route}
          </CardTitle>
          <CardDescription>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-xs">
                <Calendar className="h-3 w-3" />
                {new Date(service.departureDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <Clock className="h-3 w-3" />
                Pre-order by{' '}
                {new Date(service.preorderDeadline).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <Badge
                variant={service.serviceType === 'complimentary' ? 'default' : 'secondary'}
              >
                {service.serviceType === 'complimentary' && 'Complimentary'}
                {service.serviceType === 'buy_on_board' && 'Buy on Board'}
                {service.serviceType === 'full_service' && 'Full Service'}
              </Badge>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Deadline Warning */}
      {isDeadlinePassed && (
        <Card className="border-red-500 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-900">Pre-order deadline has passed</p>
                <p className="text-sm text-red-700 mt-1">
                  Meal selection is no longer available for this flight
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-icon-tertiary" />
        <Input
          type="search"
          placeholder="Search meals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Filters */}
      <MealFilters
        selectedDietary={selectedDietary}
        onDietaryChange={setSelectedDietary}
        onClear={() => {
          setSelectedDietary([])
          setSearchQuery('')
        }}
      />

      {/* Meal Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">
            Available Meals ({filteredMeals.length})
          </h3>
        </div>

        {filteredMeals.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-text-secondary">No meals match your filters</p>
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedDietary([])
                  setSearchQuery('')
                }}
                className="mt-4"
              >
                Clear filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredMeals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                selected={selectedMealId === meal.id}
                onSelect={() => onMealSelect(meal)}
                showPrice={service.serviceType === 'buy_on_board'}
                disabled={disabled || isDeadlinePassed}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
