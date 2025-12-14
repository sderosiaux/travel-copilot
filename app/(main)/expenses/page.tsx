'use client'

import { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'
import { ExpenseList } from '@/components/features/expenses/expense-list'
import { BudgetOverview } from '@/components/features/expenses/budget-overview'
import { CategoryBreakdown } from '@/components/features/expenses/category-breakdown'
import { useExpenseStore } from '@/lib/store/expense-store'
import { useTripStore } from '@/lib/store/trip-store'
import { mockExpenses, mockTripBudgets } from '@/data/expenses'

export default function ExpensesPage() {
  const { setExpenses, setBudgets } = useExpenseStore()
  const { trips, setTrips } = useTripStore()
  const [selectedTripId, setSelectedTripId] = useState<string>('')

  useEffect(() => {
    // Load mock data
    setExpenses(Object.values(mockExpenses))
    setBudgets(mockTripBudgets)

    // Load trips if not already loaded
    if (trips.length === 0) {
      // Import trips data
      import('@/data/trips').then((module) => {
        setTrips(Object.values(module.mockTrips))
      })
    }
  }, [setExpenses, setBudgets, setTrips, trips.length])

  useEffect(() => {
    // Set default trip
    if (!selectedTripId && trips.length > 0) {
      const upcomingTrip = trips.find((t) => t.status === 'upcoming')
      setSelectedTripId(upcomingTrip?.id || trips[0].id)
    }
  }, [trips, selectedTripId])

  const upcomingTrips = trips.filter((trip) => trip.status === 'upcoming' || trip.status === 'active')

  if (upcomingTrips.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Expense Tracker</h1>
          <p className="text-text-secondary">No trips available to track expenses</p>
        </div>
      </div>
    )
  }

  if (!selectedTripId) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Expense Tracker</h1>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  const selectedTrip = trips.find((t) => t.id === selectedTripId)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Expense Tracker</h1>
          <p className="text-text-secondary">
            Track and manage your travel expenses
          </p>
        </div>
        <div className="w-[300px]">
          <Select value={selectedTripId} onValueChange={setSelectedTripId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a trip" />
            </SelectTrigger>
            <SelectContent>
              {upcomingTrips.map((trip) => (
                <SelectItem key={trip.id} value={trip.id}>
                  {trip.title} - {trip.destination}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedTrip && (
        <div className="bg-bg-secondary rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">
                {selectedTrip.title}
              </h2>
              <p className="text-sm text-text-secondary">
                {new Date(selectedTrip.startDate).toLocaleDateString()} -{' '}
                {new Date(selectedTrip.endDate).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-secondary">Destination</p>
              <p className="text-lg font-medium text-text-primary">
                {selectedTrip.destination}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ExpenseList tripId={selectedTripId} />
        </div>
        <div className="space-y-6">
          <BudgetOverview tripId={selectedTripId} />
          <CategoryBreakdown tripId={selectedTripId} />
        </div>
      </div>
    </div>
  )
}
